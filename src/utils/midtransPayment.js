import ApiService from "@/store/api.service";
import { removePendingPayment } from "@/utils/pendingPayments";

const TERMINAL_PAYMENT_STATUSES = new Set(["settlement", "failed", "expired", "refunded"]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeResponse = (response) => response?.data || response || {};

export const isTerminalPaymentStatus = (paymentStatus) => TERMINAL_PAYMENT_STATUSES.has(paymentStatus);

export const syncPaymentStatus = async (orderId, options = {}) => {
  const { attempts = 3, delayMs = 1200, removeWhenTerminal = true } = options;
  if (!orderId) return null;

  let lastResult = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await ApiService.postJson("/payments/verify", { orderId });
      lastResult = normalizeResponse(response);

      if (isTerminalPaymentStatus(lastResult.paymentStatus)) {
        if (removeWhenTerminal) {
          removePendingPayment(orderId);
          window.dispatchEvent(new Event("iom:pending-updated"));
        }
        return lastResult;
      }
    } catch (error) {
      lastResult = { message: error?.message || "Failed to verify payment status" };
    }

    if (attempt < attempts - 1) {
      await sleep(delayMs);
    }
  }

  return lastResult;
};

export const cancelPayment = async (orderId) => {
  if (!orderId) return null;

  const response = await ApiService.postJson("/payments/cancel", { orderId });
  const result = normalizeResponse(response);

  if (isTerminalPaymentStatus(result.paymentStatus)) {
    removePendingPayment(orderId);
    window.dispatchEvent(new Event("iom:pending-updated"));
  }

  return result;
};
