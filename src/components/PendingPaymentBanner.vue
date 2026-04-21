<template>
  <Transition name="slide-up">
    <div
      v-if="pendingList.length > 0"
      class="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 md:bottom-6 z-[1000] max-w-md mx-auto md:mx-0 pointer-events-none"
    >
      <div
        class="pointer-events-auto bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl shadow-2xl shadow-amber-200/50 overflow-hidden animate-pulse-border"
      >
        <div class="bg-amber-400 px-4 py-2 flex items-center gap-2">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span class="text-sm font-bold text-amber-900 uppercase tracking-wide">⚠️ Pembayaran Belum Selesai</span>
        </div>

        <div class="p-4">
          <div v-for="p in pendingList" :key="p.orderId" class="mb-3 last:mb-0">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-800 truncate">{{ p.label || labelFor(p) }}</p>
                <p class="text-xs text-gray-600 mt-0.5">
                  <span class="font-mono">{{ p.code || p.orderId }}</span>
                </p>
                <p class="text-lg font-bold text-amber-700 mt-1">{{ formatIDR(p.amount) }}</p>
                <p class="text-[11px] text-gray-500 mt-0.5">
                  Kadaluarsa: {{ formatExpiry(p.expiresAt) }}
                </p>
              </div>
              <div class="flex flex-col gap-1.5 shrink-0">
                <button
                  @click="resume(p)"
                  :disabled="resumingOrderId === p.orderId"
                  class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-md shadow-md whitespace-nowrap flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                  </svg>
                  Lanjutkan
                </button>
                <button
                  @click="dismiss(p.orderId)"
                  class="text-[11px] text-gray-500 hover:text-red-600 px-2 py-1"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { getPendingPayments, removePendingPayment } from '@/utils/pendingPayments';

export default {
  name: 'PendingPaymentBanner',
  data() {
    return {
      pendingList: [],
      resumingOrderId: null,
      refreshTimer: null,
    };
  },
  mounted() {
    this.refresh();
    this.refreshTimer = setInterval(this.refresh, 30000);
    window.addEventListener('storage', this.refresh);
    window.addEventListener('iom:pending-updated', this.refresh);
  },
  beforeUnmount() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    window.removeEventListener('storage', this.refresh);
    window.removeEventListener('iom:pending-updated', this.refresh);
  },
  methods: {
    refresh() {
      this.pendingList = getPendingPayments();
    },
    labelFor(p) {
      if (p.type === 'donation') return 'Donasi Menunggu Pembayaran';
      if (p.type === 'transaction') return 'Pembelian Menunggu Pembayaran';
      return 'Pembayaran Menunggu';
    },
    formatIDR(value) {
      const num = Number(value || 0);
      return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
      }).format(num);
    },
    formatExpiry(ts) {
      if (!ts) return '-';
      const diffMs = ts - Date.now();
      if (diffMs <= 0) return 'expired';
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      if (hours > 0) return `${hours} jam ${minutes} menit lagi`;
      return `${minutes} menit lagi`;
    },
    dismiss(orderId) {
      removePendingPayment(orderId);
      this.refresh();
    },
    resume(p) {
      if (!window.snap) {
        alert('Snap.js belum termuat. Silakan refresh halaman.');
        return;
      }
      this.resumingOrderId = p.orderId;
      window.snap.pay(p.token, {
        onSuccess: () => {
          removePendingPayment(p.orderId);
          this.refresh();
          this.resumingOrderId = null;
          window.location.reload();
        },
        onPending: () => {
          this.resumingOrderId = null;
          this.refresh();
        },
        onError: () => {
          this.resumingOrderId = null;
        },
        onClose: () => {
          this.resumingOrderId = null;
        },
      });
    },
  },
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(120%);
  opacity: 0;
}
@keyframes pulse-border {
  0%, 100% { box-shadow: 0 20px 25px -5px rgba(251, 191, 36, 0.4), 0 10px 10px -5px rgba(251, 191, 36, 0.2); }
  50% { box-shadow: 0 20px 25px -5px rgba(251, 191, 36, 0.7), 0 10px 10px -5px rgba(251, 191, 36, 0.4); }
}
.animate-pulse-border {
  animation: pulse-border 2s ease-in-out infinite;
}
</style>
