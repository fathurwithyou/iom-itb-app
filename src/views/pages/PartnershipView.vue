<template>
  <Loading :active="isLoading" />
  <main v-if="!isLoading" class="bg-white text-main">
    <section v-if="isActivityDetailPage" class="px-[18px] pb-12 pt-6 md:px-[70px]">
      <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr,420px] lg:items-start">
        <div>
          <a href="/kemitraan" class="mb-5 inline-flex items-center gap-2 text-[14px] font-[700] text-main hover:opacity-70">
            <img :src="require('@/assets/icon/arrow-left.svg')" alt="" class="h-4 w-4" />
            Kembali ke Kemitraan
          </a>

          <h1 class="text-[32px] font-[800] leading-tight md:text-[50px]">
            {{ selectedActivity?.name || 'Kegiatan Kemitraan' }}
          </h1>
          <p class="mt-2 text-[14px] font-[600] text-main/60">
            {{ selectedActivity?.kemitraan?.name || 'IOM ITB' }} · {{ formatDate(selectedActivity?.startDate) }}
          </p>
          <p class="mt-5 max-w-3xl whitespace-pre-line text-[14px] font-[500] leading-relaxed text-main md:text-[16px]">
            {{ selectedActivity?.description || 'Informasi kegiatan kemitraan IOM ITB.' }}
          </p>
        </div>

        <img
          :src="activityImage(selectedActivity)"
          :alt="selectedActivity?.name || 'Kegiatan Kemitraan'"
          class="h-[260px] w-full rounded-[10px] object-cover shadow-xl md:h-[320px]"
        />
      </div>

      <section class="mx-auto mt-12 max-w-6xl">
        <h2 class="text-[28px] font-[800] leading-tight md:text-[40px]">Kegiatan Lainnya</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="activity in otherActivities"
            :key="activity.id"
            class="overflow-hidden rounded-[10px] bg-main text-white shadow-lg"
          >
            <img :src="activityImage(activity)" :alt="activity.name" class="h-[170px] w-full object-cover" />
            <div class="p-5">
              <p class="text-center text-[18px] font-[800]">{{ activity.name }}</p>
              <p class="mt-3 line-clamp-3 text-[13px] font-[500] leading-relaxed text-white/85">
                {{ activity.description || 'Kegiatan kemitraan IOM ITB.' }}
              </p>
              <a
                :href="`/kemitraan/kegiatan/${activity.id}`"
                class="mx-auto mt-5 inline-flex w-full max-w-[210px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-[700] text-main shadow hover:opacity-90"
              >
                Baca Selengkapnya
                <span class="ml-2">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </section>

    <section v-else-if="isDetailPage" class="px-[18px] pb-12 pt-6 md:px-[70px]">
      <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr,420px] lg:items-start">
        <div>
          <a href="/kemitraan" class="mb-5 inline-flex items-center gap-2 text-[14px] font-[700] text-main hover:opacity-70">
            <img :src="require('@/assets/icon/arrow-left.svg')" alt="" class="h-4 w-4" />
            Kembali ke Kemitraan
          </a>

          <h1 class="text-[32px] font-[800] leading-tight md:text-[50px]">
            {{ selectedPartner?.name || 'Kemitraan' }}
          </h1>
          <p class="mt-3 max-w-3xl text-[14px] font-[500] leading-relaxed text-main/80 md:text-[16px]">
            {{ selectedPartner?.description || 'Informasi kerja sama IOM ITB bersama mitra terkait.' }}
          </p>

          <div v-if="selectedPartner?.mou" class="mt-6">
            <a
              :href="selectedPartner.mou"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center rounded-full bg-main px-6 py-3 text-[14px] font-[700] text-white shadow-lg hover:opacity-90"
            >
              Lihat Dokumen MoU
              <span class="ml-2">→</span>
            </a>
          </div>
        </div>

        <div class="overflow-hidden rounded-[10px] bg-main shadow-xl">
          <img
            :src="partnerImage(selectedPartner)"
            :alt="selectedPartner?.name || 'Kemitraan IOM ITB'"
            class="h-[260px] w-full object-cover md:h-[320px]"
          />
          <div class="p-5 text-white">
            <p class="text-[13px] font-[600] uppercase tracking-wide text-white/70">Mitra IOM ITB</p>
            <p class="mt-1 text-[22px] font-[800]">{{ selectedPartner?.name || '-' }}</p>
          </div>
        </div>
      </div>

      <section class="mx-auto mt-12 max-w-6xl">
        <h2 class="text-[28px] font-[800] leading-tight md:text-[40px]">Kegiatan Terkait</h2>
        <div v-if="relatedActivities.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="activity in relatedActivities"
            :key="activity.id"
            class="overflow-hidden rounded-[10px] bg-main text-white shadow-lg"
          >
            <img
              :src="activityImage(activity)"
              :alt="activity.name"
              class="h-[170px] w-full object-cover"
            />
            <div class="p-5">
              <p class="text-[18px] font-[800]">{{ activity.name }}</p>
              <p class="mt-2 line-clamp-3 text-[13px] font-[500] leading-relaxed text-white/85">
                {{ activity.description || 'Kegiatan kemitraan IOM ITB.' }}
              </p>
              <p class="mt-4 text-[12px] font-[600] text-white/70">
                {{ activity.location || 'Lokasi menyesuaikan' }} · {{ formatDate(activity.startDate) }}
              </p>
              <a
                :href="`/kemitraan/kegiatan/${activity.id}`"
                class="mx-auto mt-5 inline-flex w-full max-w-[210px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-[700] text-main shadow hover:opacity-90"
              >
                Baca Selengkapnya
                <span class="ml-2">→</span>
              </a>
            </div>
          </article>
        </div>
        <div v-else class="mt-6 rounded-[10px] bg-[#F2F7FC] px-5 py-8 text-center text-[14px] font-[600] text-main/70">
          Belum ada kegiatan kemitraan yang terdaftar untuk mitra ini.
        </div>
      </section>
    </section>

    <section v-else class="px-[18px] pb-14 pt-8 md:px-[70px]">
      <div class="mx-auto max-w-6xl">
        <h1 class="text-center text-[32px] font-[800] leading-tight md:text-[50px]">Mitra Kami</h1>
        <p class="mx-auto mt-3 max-w-2xl text-center text-[14px] font-[500] leading-relaxed text-main/70 md:text-[16px]">
          Kolaborasi IOM ITB bersama mitra untuk mendukung kegiatan, layanan, dan pengembangan komunitas orang tua mahasiswa.
        </p>

        <div v-if="partners.length" class="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="partner in partners"
            :key="partner.id"
            class="group overflow-hidden rounded-[10px] bg-main text-white shadow-lg transition-transform duration-200 hover:-translate-y-1"
          >
            <div class="relative h-[170px] overflow-hidden bg-[#dce9ff]">
              <img
                :src="partnerImage(partner)"
                :alt="partner.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-main/30"></div>
            </div>
            <div class="px-6 pb-6 pt-5">
              <h2 class="text-center text-[20px] font-[800]">{{ partner.name }}</h2>
              <p class="mt-4 min-h-[64px] text-justify text-[13px] font-[500] leading-relaxed text-white/90">
                {{ truncate(partner.description || 'Mitra resmi IOM ITB dalam pengembangan program dan kegiatan komunitas.', 130) }}
              </p>
              <a
                :href="`/kemitraan/${partner.id}`"
                class="mx-auto mt-5 inline-flex w-full max-w-[210px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-[700] text-main shadow hover:opacity-90"
              >
                Lihat Selengkapnya
                <span class="ml-2">→</span>
              </a>
            </div>
          </article>
        </div>

        <div v-else class="mt-8 rounded-[10px] bg-[#F2F7FC] px-5 py-10 text-center text-[14px] font-[600] text-main/70">
          Belum ada data kemitraan yang dapat ditampilkan.
        </div>

        <section v-if="activities.length" class="mt-14">
          <h2 class="text-[28px] font-[800] leading-tight md:text-[40px]">Kegiatan Kemitraan</h2>
          <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="activity in activities.slice(0, 3)"
              :key="activity.id"
              class="overflow-hidden rounded-[10px] bg-main text-white shadow-lg"
            >
              <img :src="activityImage(activity)" :alt="activity.name" class="h-[170px] w-full object-cover" />
              <div class="p-5">
                <p class="text-center text-[18px] font-[800]">{{ activity.name }}</p>
                <p class="mt-3 line-clamp-3 text-[13px] font-[500] leading-relaxed text-white/85">
                  {{ activity.description || 'Kegiatan kemitraan IOM ITB.' }}
                </p>
                <a
                  :href="`/kemitraan/kegiatan/${activity.id}`"
                  class="mx-auto mt-5 inline-flex w-full max-w-[210px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-[700] text-main shadow hover:opacity-90"
                >
                  Baca Selengkapnya
                  <span class="ml-2">→</span>
                </a>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import Loading from "@/components/loading/LoadingItem.vue";
import {
  GET_DETAIL_KEMITRAAN,
  GET_KEMITRAAN,
} from "@/store/kemitraan.module";
import { GET_KEGIATAN_KEMITRAAN } from "@/store/kegiatanKemitraan.module";

export default {
  name: "PartnershipView",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    isDetailPage() {
      return this.$route.name === "Detail Kemitraan";
    },
    isActivityDetailPage() {
      return this.$route.name === "Detail Kegiatan Kemitraan";
    },
    partners() {
      return this.$store.getters.kemitraan || [];
    },
    selectedPartner() {
      if (this.isDetailPage) return this.$store.getters.detailKemitraan;
      return null;
    },
    activities() {
      return this.$store.getters.kegiatanKemitraan || [];
    },
    selectedActivity() {
      const id = Number(this.$route.params.id);
      return this.activities.find((item) => Number(item.id) === id) || null;
    },
    relatedActivities() {
      const partnerId = Number(this.$route.params.id);
      return this.activities.filter((item) => Number(item.kemitraanId) === partnerId);
    },
    otherActivities() {
      const activityId = Number(this.$route.params.id);
      return this.activities.filter((item) => Number(item.id) !== activityId).slice(0, 3);
    },
  },
  async mounted() {
    await this.getData();
    this.isLoading = false;
  },
  watch: {
    "$route.fullPath": {
      async handler() {
        this.isLoading = true;
        await this.getData();
        this.isLoading = false;
      },
    },
  },
  methods: {
    async getData() {
      const tasks = [
        this.$store.dispatch(GET_KEMITRAAN, { limit: 100, page: 1 }),
        this.$store.dispatch(GET_KEGIATAN_KEMITRAAN),
      ];

      if (this.isDetailPage) {
        tasks.push(this.$store.dispatch(GET_DETAIL_KEMITRAAN, { id: this.$route.params.id }));
      }

      await Promise.allSettled(tasks);
    },
    partnerImage(partner) {
      return partner?.image || require("@/assets/image/iom-itb.png");
    },
    activityImage(activity) {
      return activity?.image || require("@/assets/image/news1.png");
    },
    truncate(value, max) {
      const text = String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length <= max) return text;
      return `${text.slice(0, max).trim()}...`;
    },
    formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
