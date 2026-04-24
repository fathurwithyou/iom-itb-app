const DONATION_TYPE_LABELS = {
  iuran_sukarela: 'Iuran Sukarela',
  kontribusi_anggota: 'Kontribusi Anggota',
  kontribusi_donatur: 'Kontribusi Donatur',
  pembelian_merchandise: 'Pembelian Merchandise',
  kontribusi_sukarela: 'Kontribusi Sukarela',
};

const titleCase = (s) => String(s || '')
  .split(/[_\s-]+/)
  .filter(Boolean)
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  .join(' ');

export const prettifyDonationType = (value) => {
  if (!value) return 'Umum';
  return DONATION_TYPE_LABELS[value] || titleCase(value);
};

export const describeNotificationChannels = (notification) => {
  const channels = Array.isArray(notification)
    ? notification
    : notification && typeof notification === 'object'
      ? Object.keys(notification).filter((k) => notification[k])
      : [];
  const hasWa = channels.includes('Whatsapp');
  const hasEmail = channels.includes('Email');
  if (hasWa && hasEmail) return 'WhatsApp dan Email Anda';
  if (hasWa) return 'WhatsApp Anda';
  if (hasEmail) return 'Email Anda';
  return 'kontak yang Anda daftarkan';
};

export default { prettifyDonationType, describeNotificationChannels };
