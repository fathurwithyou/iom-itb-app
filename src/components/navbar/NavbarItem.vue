<template>
<nav class="sticky top-0 left-0 right-0 bg-white shadow-lg px-4 py-3 z-50">
      <ul
        :class="`xl:hidden fixed top-0 left-0 mr-10 z-10 h-[100vh] bg-white shadow-lg duration-300 overflow-hidden  ${isMenuOpen ? 'w-[250px] sm:w-[400px]' : 'w-[0]'} `"
      >
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/' ? 'font-[800]' : 'font-[500]'}`"
            href="/"
          >Beranda</a>
        </li>
        <li class="mr-4">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/tentang-kami' ? 'font-[800]' : 'font-[500]'}`"
            href="/tentang-kami"
          >Tentang Kami</a>
        </li>
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/kegiatan' ? 'font-[800]' : 'font-[500]'}`"
            href="/kegiatan"
          >Kegiatan</a>
        </li>
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/pendataan-anggota' ? 'font-[800]' : 'font-[500]'}`"
            href="/pendataan-anggota"
          >Pendataan Anggota</a>
        </li>
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/pengajuan-bantuan' ? 'font-[800]' : 'font-[500]'}`"
            href="/pengajuan-bantuan"
          >Pengajuan Bantuan</a>
        </li>
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/orangtua-asuh' ? 'font-[800]' : 'font-[500]'}`"
            href="/orangtua-asuh"
          >Menjadi Orang Tua Asuh</a>
        </li>
        <li class="nav-item">
              <a :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/merchandise' ? 'font-[800]' : 'font-[500]'}`" aria-current="page" href="/merchandise">Merchandise</a>
            </li>
        <li class="py-2">
          <a
            :class="`text-main cursor-pointer block px-4 py-2 hover:opacity-[0.8] ${$route.path === '/donasi' ? 'font-[800]' : 'font-[500]'}`"
            href="/donasi"
          >Donasi</a>
        </li>
      </ul>
      <div class="container mx-auto flex items-center justify-between">
        <a class="text-main font-[700] flex items-center" href="/">
          <img :src="require('@/assets/image/IOM-ITB-PrimaryLogo-blue.png')" alt="IOM ITB Logo" class="w-14 xl:w-16 h-auto mr-3">
          <div>
            <p class="text-[14px] xl:text-[18px] font-[700] leading-tight">Ikatan Orang Tua Mahasiswa</p>
            <p class="text-[14px] xl:text-[16px] font-[600] leading-tight">Institut Teknologi Bandung</p>
          </div>
        </a>
        <button class="text-main xl:hidden" id="navbarToggle" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="fa fa-bars"></span>
        </button>
        <div class="hidden w-full xl:flex xl:items-center xl:w-auto" id="navbarNav">
          <ul class="flex flex-col xl:flex-row xl:space-x-4">
            <li class="nav-item">
              <a :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/' ? 'font-[800]' : 'font-[500]'}`" aria-current="page" href="/">Beranda</a>
            </li>
            <li class="nav-item">
              <a :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/tentang-kami' ? 'font-[800]' : 'font-[500]'}`" aria-current="page" href="/tentang-kami">Tentang Kami</a>
            </li>
            <li class="nav-item">
              <a :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/kegiatan' ? 'font-[800]' : 'font-[500]'}`" aria-current="page" href="/kegiatan">Kegiatan</a>
            </li>
            <li class="nav-item group relative">
              <a
                :class="`flex justify-start items-center gap-1 text-main hover:opacity-80 group/item ${
                  ['/pendataan-anggota', '/pengajuan-bantuan'].includes($route.path) ? 'font-[800]' : 'font-[500]'
                }`"
                href="#"
              >

                Pendataan <ArrowSvg class="group-hover/item:rotate-180 duration-200" className="w-[16px]" color="#003793"/>
              </a>
              
              <ul
                class="absolute left-0 hidden group-hover:block bg-white shadow-lg py-2 w-64 z-10 rounded group/item"
              >
                <li class="nav-item py-2">
                  <a
                    :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/pendataan-anggota' ? 'font-[800]' : 'font-[500]'}`"
                    aria-current="page"
                    href="/pendataan-anggota"
                  >
                    Pendataan Anggota
                  </a>
                </li>
                <li class="nav-item py-2">
                  <a
                    :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/pengajuan-bantuan' ? 'font-[800]' : 'font-[500]'}`"
                    aria-current="page"
                    href="/pengajuan-bantuan"
                  >
                    Pengajuan Bantuan
                  </a>
                </li>
                <li class="nav-item py-2">
                  <a
                    :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/orangtua-asuh' ? 'font-[800]' : 'font-[500]'}`"
                    aria-current="page"
                    href="/orangtua-asuh"
                  >
                  Menjadi Orang Tua Asuh
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a :class="`text-main hover:opacity-80 px-3 py-2 ${$route.path === '/merchandise' ? 'font-[800]' : 'font-[500]'}`" aria-current="page" href="/merchandise">Merchandise</a>
            </li>
            <li class="nav-item">
              <a :class="`text-white hover:opacity-80 px-[50px] py-[13px] bg-main rounded-full`" aria-current="page" href="/donasi">Donasi</a>
            </li>
          </ul>
        </div>
        <div class="xl:hidden">
              <button
                @click="toggleMenu"
                :class="`text-gray-600 hover:text-gray-800 focus:text-gray-800 block focus:outline-none ms-auto`"
              >
                <svg
                  class="w-8 h-8 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="!isMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 6h16M6 12h16M6 18h16"
                  ></path>
                  <path
                    v-if="isMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
      </div>
</nav>
</template>

<script>
import { PURGE_AUTH } from "@/store/auth.module";
import config from "@/ConfigProvider";
import { mapGetters } from "vuex";
import ArrowSvg from "@/assets/icon/ArrowSvg.vue";

export default {
  name: "HeaderDashboard",
  components:{
    ArrowSvg
  },
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    menuItems() {
      return [
        { text: "Lihat Profile", href: `${this.feURL}/employee/profile` },
        { text: "Ubah Password", href: `${this.feURL}/employee/setting` },
        { text: "Pilih Desain CV", href: `${this.feURL}/employee/cv` },
        { text: "Lamaran Saya", href: `${this.feURL}/employee/application` },
        { text: "Clubs", href: "/clubs" },
        { text: "Track", href: "/track-career-all" },
        { text: "Keluar", href: `${this.feURL}/logout`, onClick: this.logout },
      ];
    },
    feURL() {
      return config.value("GETHIRED_WEB_URL");
    },
    currentUser() {
      const user = this.$store.getters.currentUser;
      return user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    currentLocationUrl() {
      return window.location;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      console.log(this.$route.path)
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log(this.isDropdownOpen);
    },
    handleClickOutside(event) {
      if (
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target) &&
        this.$refs.dropdownMobile &&
        !this.$refs.dropdownMobile.contains(event.target)
      ) {
        this.isDropdownOpen = false;
      }
    },
    logout() {
      this.$store.dispatch(PURGE_AUTH);
      window.location.href = this.feURL;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
/* Example transition classes */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

</style>