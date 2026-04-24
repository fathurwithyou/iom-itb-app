export const PAYMENT_SESSION_STATES = {
  NOT_STARTED: "not_started",
  PENDING: "pending",
  CANCELED: "canceled",
  EXPIRED: "expired",
  TERMINAL: "terminal",
  SETTLEMENT: "settlement",
  UNCHANGED: "unchanged",
};

export const isNotStartedPaymentSession = (value) => value === PAYMENT_SESSION_STATES.NOT_STARTED;
