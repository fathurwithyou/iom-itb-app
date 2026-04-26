<template>
  <Loading :active="isLoading" />
  <div v-if="!isLoading">

    <!-- Detail Activity -->
    <div v-if="thisPathHaveSlug" class="bg-white pt-[10px] pb-[32px] px-[18px] md:px-[70px]">
      <h2 class="text-main font-[800] text-[32px] md:text-[50px] leading-tight py-[16px] text-center md:text-start">
        {{ activity?.title }}
      </h2>

      <p class="font-[500] text-[14px] md:text-[16px] text-main opacity-60 mb-[24px]">
        {{ formatDate(activity?.date) }}
      </p>

      <!-- media preview -->
      <div v-if="allMedia.length > 0" class="mb-[32px] max-w-[600px] mx-auto">
        <div class="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
          <!-- Image -->
          <img
            v-if="allMedia[currentSlide]?.type === 'image'"
            :src="allMedia[currentSlide]?.value"
            :alt="allMedia[currentSlide]?.caption || activity?.title"
            class="w-full h-full object-cover"
          />
          <!-- YouTube -->
          <iframe
            v-else-if="allMedia[currentSlide]?.type === 'youtube'"
            :src="getYoutubeEmbed(allMedia[currentSlide]?.value)"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />

          <!-- Arrow prev -->
          <button
            v-if="allMedia.length > 1"
            @click="prevSlide"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Arrow next -->
          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Caption -->
        <p v-if="allMedia[currentSlide]?.caption" class="text-center text-xs text-gray-400 mt-2">
          {{ allMedia[currentSlide].caption }}
        </p>

        <!-- Dots -->
        <div v-if="allMedia.length > 1" class="flex justify-center gap-2 mt-3">
          <button
            v-for="(_, i) in allMedia"
            :key="i"
            @click="currentSlide = i"
            :class="currentSlide === i ? 'bg-main w-4' : 'bg-gray-300 w-2'"
            class="h-2 rounded-full transition-all"
          />
        </div>
      </div>

      <!-- Konten HTML dari Quill -->
      <div
        v-if="activity?.description"
        class="activity-content text-[14px] md:text-[16px] text-main mb-[24px]"
        v-html="activity.description"
      />

      <!-- Tombol kembali -->
      <a
        href="/kegiatan"
        class="inline-flex items-center gap-2 px-4 py-2 text-[16px] font-medium text-white bg-main rounded-full hover:opacity-80 transition-opacity"
      >
        <img :src="require('@/assets/icon/arrow-left.svg')" class="w-[18px]"/>
        Kembali
      </a>
    </div>

    <!-- List Activity (halaman /kegiatan) -->
    <div v-else class="bg-white pt-[10px] pb-[32px] px-[18px] md:px-[70px]">
      <h2 class="text-main font-[800] text-[32px] md:text-[50px] leading-tight py-[16px] text-center md:text-start">
        Kegiatan Terbaru
      </h2>

      <!-- Featured activity pertama -->
      <div v-if="activities.length > 0" class="flex flex-col md:flex-row justify-between gap-8 mb-[40px]">
        <div class="w-full md:w-1/2 text-justify">
          <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700] mb-[4px]">
            {{ activities[0]?.title }}
          </h4>
          <p class="font-[500] text-[14px] text-main opacity-60 mb-[16px]">
            {{ formatDate(activities[0]?.date) }}
          </p>
          <p class="font-[500] text-[14px] md:text-[16px] text-main mb-[24px]">
            {{ truncate(stripHtml(activities[0]?.description), 300) }}
          </p>
          <a
            :href="getUrl(activities[0]?.url)"
            class="inline-flex items-center px-4 py-2 text-[16px] font-medium text-white bg-main rounded-full hover:opacity-80 transition-opacity"
          >
            Baca Selengkapnya
          </a>
        </div>
        <img
          :src="activities[0]?.image"
          :alt="activities[0]?.title"
          class="w-full md:w-1/2 object-cover rounded-xl hidden md:block"
        />
      </div>
    </div>

    <!-- Kegiatan lainnya -->
    <div class="bg-white p-[16px] md:p-[24px] px-[18px] md:px-[70px]">
      <h2 class="text-main font-[800] text-[32px] md:text-[50px] leading-tight py-[16px]">
        {{ thisPathHaveSlug ? 'Kegiatan Lainnya' : 'Semua Kegiatan' }}
      </h2>
      <ActivitiesItem />
    </div>

  </div>
</template>

<script>
import { GET_DETAIL_ACTIVITY, GET_ACTIVITIES } from "@/store/activities.module";
import ActivitiesItem from "@/components/card/ActivitiesItem.vue";
import Loading from "@/components/loading/LoadingItem.vue";
import { getUrl, truncate } from "@/utils";

export default {
  components: {
    ActivitiesItem,
    Loading,
  },
  data() {
    return {
      isLoading: true,
      currentSlide: 0,
    };
  },
  computed: {
    activities() {
      return this.$store.getters.activities || [];
    },
    activity() {
      return this.thisPathHaveSlug
        ? this.$store.getters.detailActivity
        : this.$store.getters.activities?.[0];
    },
    thisPathHaveSlug() {
      return this.$route.path.split("/").filter(Boolean).length > 1;
    },
    allMedia() {
      if (!this.activity) return [];
      const media = this.activity.media || [];
      // Tambahkan thumbnail sebagai slide pertama kalau belum ada di media
      if (this.activity.image) {
        const alreadyInMedia = media.some(m => m.value === this.activity.image);
        if (!alreadyInMedia) {
          return [{ type: 'image', value: this.activity.image, caption: null }, ...media];
        }
      }
      return media;
    }
  },
  async mounted() {
    await this.getData();
    this.isLoading = false;
  },
  methods: {
    truncate,
    getUrl,
    async getData() {
      try {
        if (this.$route.params.slug) {
          await this.$store.dispatch(GET_DETAIL_ACTIVITY, {
            slug: this.$route.params.slug
          });
        }
        await this.$store.dispatch(GET_ACTIVITIES, {
          search: "",
          limit: 100,
          page: 1,
          status: "published", // hanya tampilkan yang published
        });
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    // Strip HTML tags untuk preview description di list
    stripHtml(html) {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    },
    prevSlide() {
      if (this.currentSlide > 0) this.currentSlide--;
    },
    nextSlide() {
      if (this.currentSlide < this.allMedia.length - 1) this.currentSlide++;
    },
    getYoutubeEmbed(url) {
      const match = url?.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    },
  }
};
</script>

<style scoped>
/* Styling untuk konten HTML dari Quill */
.activity-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}
.activity-content :deep(h1),
.activity-content :deep(h2),
.activity-content :deep(h3) {
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}
.activity-content :deep(h1) { font-size: 1.75rem; }
.activity-content :deep(h2) { font-size: 1.5rem; }
.activity-content :deep(h3) { font-size: 1.25rem; }
.activity-content :deep(ul),
.activity-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.activity-content :deep(ul) { list-style-type: disc; }
.activity-content :deep(ol) { list-style-type: decimal; }
.activity-content :deep(li) { margin-bottom: 0.25rem; }
.activity-content :deep(blockquote) {
  border-left: 4px solid #003A6E;
  padding-left: 1rem;
  color: #666;
  font-style: italic;
  margin: 1rem 0;
}
.activity-content :deep(a) {
  color: #003A6E;
  text-decoration: underline;
  cursor: pointer;
}
.activity-content :deep(a:hover) {
  opacity: 0.8;
}
.activity-content :deep(strong) { font-weight: 700; }
.activity-content :deep(em) { font-style: italic; }
</style>