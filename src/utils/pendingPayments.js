const STORAGE_KEY = 'iom_pending_payments';
const DEFAULT_TTL_HOURS = 24;

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota errors */
  }
};

const now = () => Date.now();

const pruneExpired = (list) => list.filter((p) => !p.expiresAt || p.expiresAt > now());

export const getPendingPayments = () => {
  const pruned = pruneExpired(readAll());
  if (pruned.length !== readAll().length) writeAll(pruned);
  return pruned.sort((a, b) => b.createdAt - a.createdAt);
};

export const savePendingPayment = (payment) => {
  const ttlMs = (payment.ttlHours || DEFAULT_TTL_HOURS) * 60 * 60 * 1000;
  const entry = {
    orderId: payment.orderId,
    token: payment.token,
    type: payment.type,
    amount: payment.amount,
    label: payment.label,
    code: payment.code || null,
    orderStatusToken: payment.orderStatusToken || payment.trackingToken || payment.publicToken || null,
    transactionId: payment.transactionId || null,
    createdAt: now(),
    expiresAt: now() + ttlMs,
  };
  const list = pruneExpired(readAll()).filter((p) => p.orderId !== entry.orderId);
  list.push(entry);
  writeAll(list);
  return entry;
};

export const removePendingPayment = (orderId) => {
  const next = readAll().filter((p) => p.orderId !== orderId);
  writeAll(next);
};

export const clearAllPendingPayments = () => writeAll([]);
