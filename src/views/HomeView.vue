<template>
  <div class="overflow-hidden">
    <HeaderItem />
  </div>
  <div class="bg-white">
    <h2 class="text-main font-[800] text-[32px] md:text-[50px] text-center leading-tight md:leading-[65.1px] py-[16px]">Tentang Kami</h2>
    <div class="flex flex-col md:flex-row justify-between items-center">
      <img :src="require('@/assets/image/IOM-ITB-PrimaryLogo-blue.png')" alt="IOM-ITB" class="w-full md:w-1/2 object-cover p-4 md:p-20">
      <div class="w-full md:w-[45%] bg-main rounded-l-[50px] py-[40px] md:py-[61px] px-[30px] md:px-[70px]">
        <h4 class="text-[24px] md:text-[26px] capitalize text-white font-[700]">Ikatan Orang Tua Mahasiswa</h4>
        <h5 class="text-[18px] md:text-[20px] capitalize text-white font-[600]">Institut Teknologi Bandung</h5>
        <br>
        <p class="font-[500] text-[14px] md:text-[16px] text-white">IOM-ITB berfungsi sebagai mitra ITB, khususnya dalam pembinaan kelangsungan pendidikan yang bersifat sosial dan kekeluargaan.</p>
        <br>
        <br>
        <a href="/tentang-kami" class="bg-white text-main font-[600] text-[16px] md:text-[18px] rounded-full p-[10px] md:p-[12px] hover:opacity-[0.8]">Baca Selengkapnya</a>
      </div>
    </div>
  </div>

  <div class="bg-white p-[16px] md:p-[24px] w-full">
    <h2 class="text-main font-[800] text-[32px] md:text-[50px] text-center leading-tight md:leading-[65.1px] py-[16px]">10 Donatur Terakhir</h2>
    <TableDonation class="w-full"/>
  </div>

  <div class="bg-white p-[16px] md:p-[24px]">
    <h2 class="text-main font-[800] text-[32px] md:text-[50px] text-center leading-tight md:leading-[65.1px] py-[16px]">Kegiatan</h2>
    <form
      class="mx-auto mb-6 flex w-full max-w-[720px] flex-col gap-3 sm:flex-row"
      @submit.prevent="submitActivitySearch"
    >
      <label for="home-activity-search" class="sr-only">Cari kegiatan</label>
      <div class="relative flex-1">
        <svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          id="home-activity-search"
          v-model="activitySearch"
          type="search"
          placeholder="Cari kegiatan..."
          class="h-[52px] w-full rounded-xl border-2 border-[#b8c7e3] bg-[#f8fbff] py-3.5 pl-12 pr-4 text-[15px] text-gray-800 shadow-sm transition focus:border-[#003793] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
      </div>
      <button
        type="submit"
        class="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-main px-6 text-[15px] font-[700] text-white shadow-sm transition hover:opacity-85 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        Cari
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </button>
    </form>
    <ActivitiesItem />
  </div>

  <div class="bg-white py-[50px] md:py-[104px] px-[20px] md:px-[42px] text-center">
    <GraphicItem/>
  </div>

  <div class="bg-colorSecond py-[50px] md:py-[104px] px-[20px] md:px-[42px] text-center">
    <div class="mb-[16px] md:mb-[24px]">
      <h4 class="text-[32px] md:text-[50px] text-center text-main font-[800]">Visi</h4>
      <p class="text-[24px] md:text-[40px] text-center text-main max-w-[981px] font-[400] mx-auto">Bersama ITB, melahirkan anak bangsa yang cerdas, tangguh dan berakhlak mulia.</p>
    </div>
    <div class="mb-[16px] md:mb-[24px] text-center">
      <h4 class="text-[32px] md:text-[50px] text-center text-main font-[800]"> MISI</h4>
      <p class="text-[24px] md:text-[40px] text-center text-main max-w-[981px] font-[400] mx-auto">Memotivasi dan membantu mahasiswa ITB untuk mengatasi kendala dalam studinya serta berperan aktif dalam pembinaan watak, kepedulian sosial dan budaya.</p>
    </div>
  </div>

  <div class="bg-main pt-[24px] pb-[34px]">
    <h2 class="text-[32px] md:text-[50px] capitalize text-white font-[800] text-center mb-[24px] md:mb-[42px]">Video</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
      <div class="text-center">
        <hr class="blue mb-4">
        <iframe width="100%" height="180px" class="embed-responsive-item" src="https://www.youtube.com/embed/kAnaKIZxwE8?si=e6ICwmu1a5erNizZ?rel=0&amp;autoplay=1&amp;mute=1" allowfullscreen></iframe>
      </div>

      <div class="text-center">
        <hr class="blue mb-4">
        <iframe width="100%" height="180px" class="embed-responsive-item" src="https://www.youtube.com/embed/Rp6d9zQJsjk?si" allowfullscreen></iframe>
      </div>
      <div class="text-center">
        <hr class="blue mb-4">
        <iframe width="100%" height="180px" class="embed-responsive-item" src="https://www.youtube.com/embed/SjcNKHzNb98?si" allowfullscreen></iframe>
      </div>
      <div class="text-center">
        <hr class="blue mb-4">
        <iframe width="100%" height="180px" class="embed-responsive-item" src="https://www.youtube.com/embed/C8yc-4VEkJo" allowfullscreen></iframe>
      </div>
      <div class="text-center">
        <hr class="blue mb-4">
        <iframe width="100%" height="180px" class="embed-responsive-item" src="https://www.youtube.com/embed/AvrMUHcEAgQ?si=Jr0M8Ehnp34DFFMQ?rel=0&amp;autoplay=1&amp;mute=1" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ACTIVITIES } from "@/store/activities.module";
import HeaderItem from "@/components/header/HeaderItem.vue";
import GraphicItem from "@/components/item/GraphicItem.vue";
import ActivitiesItem from "@/components/card/ActivitiesItem.vue";
import TableDonation from "@/components/table/TableDonation.vue";

export default {
  components: {
    HeaderItem,
    GraphicItem,
    ActivitiesItem,
    TableDonation
  },
  computed:{
  },
  setup() {
    return {};
  },
  data() {
    return {
      activitySearch: "",
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    submitActivitySearch() {
      const q = this.activitySearch.trim();
      this.$router.push(q ? { path: "/kegiatan", query: { q } } : { path: "/kegiatan" });
    },
    async getData() {
      try {
        await this.$store.dispatch(GET_ACTIVITIES, {
          search: "",
          limit: 1000,
          page: 1,
        });
      } catch (err) {
        console.error(err);
      }
    },
  }
};
</script>

<style scoped>
.blue {
  border-color: #003A6E;
}
</style>
