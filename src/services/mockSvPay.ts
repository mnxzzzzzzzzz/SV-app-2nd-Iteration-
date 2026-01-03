import type {
  AuthorizeResponse,
  ConfirmResponse,
  VoidResponse,
  PaymentStatus,
} from "../types/svpay";

interface PaymentIntent {
  intent_id: string;
  status: PaymentStatus;
  original_amount: number;
  discounted_amount: number | null;
  reason_code: string | null;
}

const paymentIntents: Map<string, PaymentIntent> = new Map();

function generateIntentId(): string {
  return `pi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function authorizePayment(
  amount: number
): Promise<AuthorizeResponse> {
  const intent_id = generateIntentId();

  const hasDiscount = Math.random() > 0.5;
  const discounted_amount = hasDiscount
    ? Math.round(amount * 0.85 * 100) / 100
    : null;

  const reason_code = hasDiscount ? "STUDENT_DISCOUNT_15" : null;

  const intent: PaymentIntent = {
    intent_id,
    status: "AUTHORIZED",
    original_amount: amount,
    discounted_amount,
    reason_code,
  };

  paymentIntents.set(intent_id, intent);

  return {
    intent_id,
    status: "AUTHORIZED",
    original_amount: amount,
    discounted_amount,
    reason_code,
  };
}

export async function confirmPayment(
  intent_id: string
): Promise<ConfirmResponse> {
  const intent = paymentIntents.get(intent_id);

  if (!intent) {
    throw new Error(`Payment intent not found: ${intent_id}`);
  }

  if (intent.status !== "AUTHORIZED") {
    throw new Error(
      `Cannot confirm payment: current status is ${intent.status}, expected AUTHORIZED`
    );
  }

  intent.status = "CONFIRMED";
  paymentIntents.set(intent_id, intent);

  return {
    intent_id,
    status: "CONFIRMED",
  };
}

export async function voidPayment(intent_id: string): Promise<VoidResponse> {
  const intent = paymentIntents.get(intent_id);

  if (!intent) {
    throw new Error(`Payment intent not found: ${intent_id}`);
  }

  if (intent.status !== "AUTHORIZED") {
    throw new Error(
      `Cannot void payment: current status is ${intent.status}, expected AUTHORIZED`
    );
  }

  intent.status = "VOIDED";
  paymentIntents.set(intent_id, intent);

  return {
    intent_id,
    status: "VOIDED",
  };
}

export function getPaymentIntent(intent_id: string): PaymentIntent | undefined {
  return paymentIntents.get(intent_id);
}

export function clearPaymentIntents(): void {
  paymentIntents.clear();
}
