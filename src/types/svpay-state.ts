import type { PaymentStatus } from "./svpay";

export interface SvPayState {
  intent_id: string | null;
  status: PaymentStatus | null;
  original_amount: number | null;
  discounted_amount: number | null;
  reason_code: string | null;
  loading: boolean;
  error: string | null;
}

export const initialSvPayState: SvPayState = {
  intent_id: null,
  status: null,
  original_amount: null,
  discounted_amount: null,
  reason_code: null,
  loading: false,
  error: null,
};
