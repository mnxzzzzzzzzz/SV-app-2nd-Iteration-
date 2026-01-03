export type PaymentStatus = "AUTHORIZED" | "CONFIRMED" | "VOIDED";

export interface AuthorizeResponse {
  intent_id: string;
  status: "AUTHORIZED";
  original_amount: number;
  discounted_amount?: number | null;
  reason_code?: string | null;
}

export interface ConfirmResponse {
  intent_id: string;
  status: "CONFIRMED";
}

export interface VoidResponse {
  intent_id: string;
  status: "VOIDED";
}
