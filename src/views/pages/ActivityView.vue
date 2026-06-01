<template>
  <Loading :active="isLoading" />
  <div v-if="!isLoading">

    <!-- 404 -->
    <NotFound v-if="notFound" message="Kegiatan yang kamu cari tidak ditemukan." />

    <template v-else>

      <!-- ===== DETAIL ACTIVITY ===== -->
      <div v-if="thisPathHaveSlug" class="bg-white px-[18px] md:px-[70px] pt-8 pb-[32px]">

        <!-- Header: Thumbnail + Judul/Meta -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 mb-10 md:mb-14">
          <!-- Thumbnail -->
          <div class="w-full md:w-[45%] shrink-0 bg-gray-100 aspect-[16/9] md:aspect-auto md:h-[340px] overflow-hidden rounded-xl">
            <img
              v-if="activity?.image"
              :src="activity.image"
              :alt="activity.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>

          <!-- Judul + Tag + Tanggal + Tombol Kembali -->
          <div class="flex-1 flex flex-col justify-center gap-6">
            <!-- Judul, tags, tanggal -->
            <div>
              <h1 class="font-[800] text-[28px] md:text-[38px] leading-tight mb-4 text-main">
                {{ activity?.title }}
              </h1>
              <div v-if="activity?.tags?.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in activity.tags"
                  :key="tag.id"
                  @click.prevent="goToTagSearch(tag.name)"
                  class="px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-75 transition-opacity"
                  style="background-color: #003793; color: white;"
                >
                  {{ tag.name }}
                </span>
              </div>
              <p class="text-sm text-gray-400">
                Dipublish pada {{ formatDate(activity?.date) }}
              </p>
            </div>

            <!-- Tombol kembali -->
            <div>
              <a
                href="/kegiatan"
                class="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium rounded-full border-2 transition-opacity hover:opacity-70"
                style="border-color: #003793; color: #003793;"
              >
                <img :src="require('@/assets/icon/arrow-left.svg')" class="w-[16px]" style="filter: invert(19%) sepia(98%) saturate(1200%) hue-rotate(210deg) brightness(60%)"/>
                Kembali
              </a>
            </div>
          </div>
        </div>

        <!-- Sidebar kiri + Konten -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-10 items-start mb-10">

          <!-- Sidebar -->
          <div class="w-full md:w-80 shrink-0 border border-gray-200 rounded-2xl px-6 py-6 shadow-sm md:sticky md:top-[20px]">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Ditulis oleh</p>
            <ul class="mb-5 space-y-1">
              <template v-if="activity?.contributors?.length > 0">
                <li v-for="(c, i) in activity.contributors" :key="i" class="text-sm text-gray-600 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"/>
                  {{ c }}
                </li>
              </template>
              <li v-else class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"/>
                IOM ITB
              </li>
            </ul>

            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Dipublikasikan</p>
            <p class="text-sm text-gray-600 mb-5">{{ formatDate(activity?.date) }}</p>

            <div v-if="activity?.tags?.length > 0">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kategori</p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in activity.tags"
                  :key="tag.id"
                  class="px-2.5 py-1 text-xs font-semibold rounded-full"
                  style="background-color: #003793; color: white;"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Konten -->
          <div class="flex-1 min-w-0">
            <div
              v-if="activity?.description"
              class="activity-content text-[14px] md:text-[16px] text-main mb-8"
              v-html="activity.description"
            />

            <a
              href="/kegiatan"
              class="inline-flex items-center gap-2 px-4 py-2 text-[16px] font-medium text-white bg-main rounded-full hover:opacity-80 transition-opacity"
            >
              <img :src="require('@/assets/icon/arrow-left.svg')" class="w-[18px]"/>
              Kembali
            </a>
          </div>
        </div>

        <!-- Kegiatan Lainnya -->
        <div class="mt-12">
          <h2 class="text-main font-[800] text-[24px] md:text-[32px] leading-tight mb-8">Kegiatan Lainnya</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              v-for="item in otherActivities"
              :key="item.id"
              :href="getUrl(item.url)"
              class="group flex flex-col"
            >
              <!-- Thumbnail -->
              <div class="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-3">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-2">
                <template v-if="item.tags?.length > 0">
                  <span
                    v-for="tag in item.tags"
                    :key="tag.id"
                    @click.prevent="goToTagSearch(tag.name)"
                    class="px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-75 transition-opacity"
                    style="background-color: #003793; color: white;"
                  >
                    {{ tag.name }}
                  </span>
                </template>
                <span v-else class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #e5e7eb; color: #6b7280;">
                  Tidak ada kategori
                </span>
              </div>
              <!-- Judul -->
              <h3 class="font-[700] text-[18px] text-gray-900 leading-snug mb-2 group-hover:opacity-70 transition-opacity">
                {{ truncate(item.title, 70) }}
              </h3>
              <!-- Preview -->
              <p class="text-[14px] text-gray-400 leading-relaxed mb-2 line-clamp-2">
                {{ truncate(stripHtml(item.description), 100) }}
              </p>
              <!-- Meta -->
              <div class="flex flex-wrap items-center gap-x-1.5 text-xs text-gray-400 mt-auto">
                <span>{{ formatDate(item.date) }}</span>
                <span>·</span>
                <template v-if="item.contributors?.length > 0">
                  <span v-for="(c, i) in item.contributors" :key="i">
                    {{ c }}<span v-if="i < item.contributors.length - 1">,</span>
                  </span>
                </template>
                <span v-else>IOM-ITB</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- ===== LIST ACTIVITY ===== -->
      <div v-else class="bg-white px-[18px] md:px-[70px] pt-8 pb-[32px]">

        <!-- Kegiatan Terbaru -->
        <h2 class="text-main font-[800] text-[32px] md:text-[50px] leading-tight mb-10 md:mb-14">
          Kegiatan Terbaru
        </h2>

        <div v-if="activities.length > 0" class="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
          <!-- Thumbnail kiri -->
          <img
            :src="activities[0]?.image"
            :alt="activities[0]?.title"
            class="w-full md:w-1/2 aspect-[16/9] object-cover rounded-xl"
          />
          <!-- Konten kanan -->
          <div class="flex-1 flex flex-col justify-center">
            <!-- Judul -->
            <h4 class="text-[24px] md:text-[32px] text-main font-[800] leading-tight mb-3">
              {{ activities[0]?.title }}
            </h4>

            <!-- Tags chips -->
            <div v-if="activities[0]?.tags?.length > 0" class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in activities[0].tags"
                :key="tag.id"
                @click="goToTagSearch(tag.name)"
                class="px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-75 transition-opacity"
                style="background-color: #003793; color: white;"
              >
                {{ tag.name }}
              </span>
            </div>

            <!-- Tanggal · Kontributor -->
            <div class="flex flex-wrap items-center gap-x-2 text-sm text-gray-400 mb-4">
              <span>{{ formatDate(activities[0]?.date) }}</span>
              <template v-if="activities[0]?.contributors?.length > 0">
                <span>·</span>
                <span>{{ activities[0].contributors.join(', ') }}</span>
              </template>
            </div>

            <p class="font-[500] text-[14px] md:text-[16px] text-gray-500 mb-6 line-clamp-4">
              {{ truncate(stripHtml(activities[0]?.description), 300) }}
            </p>
            <a
              :href="getUrl(activities[0]?.url)"
            >
            <div>
              <span
                class="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium rounded-full border-2 transition-opacity hover:opacity-70"
                style="border-color: #003793; color: #003793;"
              >
              Baca Selengkapnya

                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
            </div>
            </a>
          </div>
        </div>

        <!-- Semua Kegiatan -->
        <h2 id="semua-kegiatan" class="text-main font-[800] text-[32px] md:text-[40px] leading-tight mb-4">
          Semua Kegiatan
        </h2>

        <!-- Searchbar di bawahnya, di kanan -->
        <div class="flex justify-end mb-6">
          <div class="relative w-[280px]">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="search"
              @input="debouncedSearch"
              placeholder="Cari judul, konten, atau tag..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <!-- Grid cards -->
        <div v-if="filteredActivities.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="item in filteredActivities"
            :key="item.id"
            :href="getUrl(item.url)"
            class="group flex flex-col"
          >
            <!-- Thumbnail -->
            <div class="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-3">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-2">
              <template v-if="item.tags?.length > 0">
                <span
                  v-for="tag in item.tags"
                  :key="tag.id"
                  @click.prevent="goToTagSearch(tag.name)"
                  class="px-3 py-1 text-xs font-semibold rounded-full cursor-pointer hover:opacity-75 transition-opacity"
                  style="background-color: #003793; color: white;"
                >
                  {{ tag.name }}
                </span>
              </template>
              <span v-else class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #e5e7eb; color: #6b7280;">
                Tidak ada kategori
              </span>
            </div>
            <!-- Judul -->
            <h3 class="font-[700] text-[22px] text-gray-900 leading-snug mb-2 group-hover:opacity-70 transition-opacity">
              {{ truncate(item.title, 70) }}
            </h3>
            <!-- Preview -->
            <p class="text-[16px] text-gray-400 leading-relaxed mb-2 line-clamp-2">
              {{ truncate(stripHtml(item.description), 100) }}
            </p>
            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-x-1.5 text-xs text-gray-400 mt-auto">
              <span>{{ formatDate(item.date) }}</span>
              <span>·</span>
              <template v-if="item.contributors?.length > 0">
                <span v-for="(c, i) in item.contributors" :key="i">
                  {{ c }}<span v-if="i < item.contributors.length - 1">,</span>
                </span>
              </template>
              <span v-else>IOM-ITB</span>
            </div>
          </a>
        </div>
        <div v-else class="text-center py-16 text-gray-400 text-sm">
          Tidak ada kegiatan yang ditemukan.
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import { GET_DETAIL_ACTIVITY, GET_ACTIVITIES } from "@/store/activities.module";
import Loading from "@/components/loading/LoadingItem.vue";
import NotFound from "@/views/pages/Error/404.vue";
import { getUrl, truncate } from "@/utils";

export default {
  components: { Loading, NotFound },
  data() {
    return {
      isLoading: true,
      notFound: false,
      currentSlide: 0,
      searchTimer: null,
      search: this.$route.query.tag || '',
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
      if (this.activity.image) {
        const alreadyInMedia = media.some(m => m.value === this.activity.image);
        if (!alreadyInMedia) {
          return [{ type: 'image', value: this.activity.image, caption: null }, ...media];
        }
      }
      return media;
    },
    filteredActivities() {
      const list = this.activities.slice(1); // skip activities[0] yg sudah jadi featured
      if (!this.search.trim()) return list;
      const q = this.search.trim().toLowerCase();
      return list.filter(a => {
        const inTitle = a.title?.toLowerCase().includes(q);
        const inDesc = this.stripHtml(a.description)?.toLowerCase().includes(q);
        const inTags = a.tags?.some(t => t.name?.toLowerCase().includes(q));
        return inTitle || inDesc || inTags;
      });
    },
    otherActivities() {
      const slug = this.$route.params.slug;
      return this.activities
        .filter(a => a.url !== slug)
        .slice(0, 6);
    },
  },
  async mounted() {
    await this.getData();
    this.isLoading = false;
    if (this.$route.query.tag) {
      this.$nextTick(() => {
        const el = document.getElementById('semua-kegiatan');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  },
  methods: {
    truncate,
    getUrl,
    async getData() {
      try {
        if (this.$route.params.slug) {
          await this.$store.dispatch(GET_DETAIL_ACTIVITY, { slug: this.$route.params.slug });
          if (!this.$store.getters.detailActivity) {
            this.notFound = true;
            return;
          }
        }
        await this.$store.dispatch(GET_ACTIVITIES, {
          search: "",
          limit: 100,
          page: 1,
        });
      } catch (err) {
        console.error(err);
        if (this.$route.params.slug) this.notFound = true;
      }
    },
    debouncedSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {}, 0); // search dilakukan di computed, debounce hanya untuk UX
    },
    goToTagSearch(tagName) {
      this.search = tagName;
      this.$nextTick(() => {
        const el = document.getElementById('semua-kegiatan');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
    },
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
.activity-content :deep(p) { margin-bottom: 1rem; line-height: 1.7; }
.activity-content :deep(h1),
.activity-content :deep(h2),
.activity-content :deep(h3) { font-weight: 700; margin-bottom: 0.75rem; margin-top: 1.5rem; }
.activity-content :deep(h1) { font-size: 1.75rem; }
.activity-content :deep(h2) { font-size: 1.5rem; }
.activity-content :deep(h3) { font-size: 1.25rem; }
.activity-content :deep(ul),
.activity-content :deep(ol) { padding-left: 1.5rem; margin-bottom: 1rem; }
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
.activity-content :deep(a) { color: #003A6E; text-decoration: underline; cursor: pointer; }
.activity-content :deep(a:hover) { opacity: 0.8; }
.activity-content :deep(strong) { font-weight: 700; }
.activity-content :deep(em) { font-style: italic; }
.activity-content :deep(img) {
  max-width: 100%;       
  height: auto;           
  border-radius: 8px;
  display: inline-block;  
  margin: 0.25rem;
}
.activity-content :deep(img[style*="width"]) {
  height: auto !important;
}
.activity-content :deep(p img) {
  display: inline-block;
}
.activity-content :deep(div[data-youtube-video]) {
  margin: 1.2rem auto;
  border-radius: 10px;
  overflow: hidden;
  max-width: 720px;
}
.activity-content :deep(div[data-youtube-video] iframe),
.activity-content :deep(iframe) {
  width: 100%;
  aspect-ratio: 16/9;
  height: auto;
  border: none;
  border-radius: 10px;
  display: block;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2; 
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 4; 
}
</style>