const parseDonationAmount = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.trunc(value) : 0;
  }

  const raw = String(value || "").trim();
  if (!raw) return 0;

  const digitsOnly = raw.replace(/[^\d]/g, "");
  return digitsOnly ? Number.parseInt(digitsOnly, 10) : 0;
};

const normalizeFacultyUniqueCode = (faculty) => {
  const digits = String(faculty?.kodeUnik || "").replace(/\D/g, "");
  if (!digits) return null;
  return digits.slice(-3).padStart(3, "0");
};

const isValidBaseDonationAmount = (amount) => Number.isInteger(amount) && amount > 0 && amount % 1000 === 0;

const getDonationAmountSummary = ({ amount, faculty }) => {
  const baseAmount = parseDonationAmount(amount);
  const uniqueCode = normalizeFacultyUniqueCode(faculty);
  const uniqueCodeAmount = uniqueCode ? Number.parseInt(uniqueCode, 10) : 0;

  return {
    baseAmount,
    uniqueCode,
    uniqueCodeAmount,
    grossAmount: baseAmount + uniqueCodeAmount,
    isValidBaseAmount: isValidBaseDonationAmount(baseAmount),
  };
};

const formatIDR = (amount) => `Rp ${Number(amount || 0).toLocaleString("id-ID")}`;

export {
  parseDonationAmount,
  normalizeFacultyUniqueCode,
  isValidBaseDonationAmount,
  getDonationAmountSummary,
  formatIDR,
};
