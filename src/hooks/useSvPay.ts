import { useState, useCallback } from "react";
import type { SvPayState } from "../types/svpay-state";
import { initialSvPayState } from "../types/svpay-state";
import {
  authorizePayment,
  confirmPayment,
  voidPayment,
} from "../services/mockSvPay";

export function useSvPay() {
  const [state, setState] = useState<SvPayState>(initialSvPayState);

  const authorize = useCallback(async (amount: number) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await authorizePayment(amount);
      setState({
        intent_id: response.intent_id,
        status: response.status,
        original_amount: response.original_amount,
        discounted_amount: response.discounted_amount ?? null,
        reason_code: response.reason_code ?? null,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Authorization failed",
      }));
    }
  }, []);

  const confirm = useCallback(async () => {
    if (!state.intent_id) {
      setState((prev) => ({
        ...prev,
        error: "No payment intent to confirm",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await confirmPayment(state.intent_id);
      setState((prev) => ({
        ...prev,
        status: response.status,
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Confirmation failed",
      }));
    }
  }, [state.intent_id]);

  const voidIntent = useCallback(async () => {
    if (!state.intent_id) {
      setState((prev) => ({
        ...prev,
        error: "No payment intent to void",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await voidPayment(state.intent_id);
      setState((prev) => ({
        ...prev,
        status: response.status,
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Void failed",
      }));
    }
  }, [state.intent_id]);

  const reset = useCallback(() => {
    setState(initialSvPayState);
  }, []);

  return {
    state,
    authorize,
    confirm,
    voidIntent,
    reset,
  };
}
