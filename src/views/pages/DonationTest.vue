<template>
  <div class="relative bg-colorSecond pt-[10px] pb-[32px] px-[18px] md:px-[70px]">
    <FormDonation v-if="isOpen" @close="closePopup" />
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="w-full md:w-1/2">
        <p class="font-[500] text-[16px] md:text-[18px] text-main whitespace-pre-line">
          Kami lakukan ini untuk mahasiswa
        </p>
        <h4 class="text-[24px] md:text-[50px] capitalize text-main font-[700] mb-[4px]">Mari Berdonasi Bersama
          IOM-ITB
        </h4>
        <p class="font-[500] text-[14px] md:text-[16px] text-main whitespace-pre-line mb-[24px]">
          IOM-ITB membantu para mahasiswa ITB yang membutuhkan bantuan, baik dalam hal finansial (UKT, Biaya Hidup, dll) ataupun non-finansial (pendampingan).
        </p>
        <button @click="openPopup" class="inline-flex items-center px-3 py-2 text-[18px] font-medium text-center text-white bg-main rounded-full hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300">
          Donasi Sekarang
        </button>
      </div>
      <img :src="require('@/assets/image/donation-header.png')" alt="Donation" class="w-full md:w-1/2 p-4 md:p-20 hidden md:block">
    </div>
  </div>

  <div class="bg-white py-[16px] md:py-[24px] px-[18px] md:px-[70px]">
    <div class="flex flex-col lg:flex-row justify-center items-center  px-[18px] md:px-[70px]">
      <div class="flex items-center gap-4 w-full lg:w-1/2 mb-4 lg:mb-0 lg:justify-end lg:mr-8">
        <img :src="require('@/assets/icon/icon-sukarelawan.png')" alt="sukarelawan" class="w-[100px]">
        <div>
          <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700] mb-[4px]">Mari Berdonasi Bersama IOM-ITB</h4>
          <p class="font-[400] text-[16px] md:text-[18px] text-main whitespace-pre-line">
            Kami lakukan ini untuk mahasiswa
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4 w-full lg:w-1/2 mb-4 lg:mb-0">
        <img :src="require('@/assets/icon/icon-dana.png')" alt="dana" class="w-[100px]">
        <div>
          <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700] mb-[4px]">Galang Dana Cepat</h4>
          <p class="font-[400] text-[16px] md:text-[18px] text-main whitespace-pre-line">
            Kami membantu untuk mengembangkan secepatnya bantuan yang ada.
          </p>
        </div>
      </div>
     
    </div>
    <div class="flex justify-center items-center  px-[18px] md:px-[70px]">
    <div class="flex justify-center items-center gap-4 w-full lg:w-1/2">
        <img :src="require('@/assets/icon/icon-donasi.png')" alt="donasi" class="w-[100px]">
        <div>
          <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700] mb-[4px]">Mulai Donasi</h4>
          <p class="font-[400] text-[16px] md:text-[18px] text-main whitespace-pre-line">
            Mari bersama-sama untuk melakukan kebaikan demi kepentingan mahasiswa yang dibutuhkan.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="border w-[90%] mx-auto opacity-50"></div>

  <div class="bg-white py-[24px] px-[18px] md:px-[70px]">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <img :src="require('@/assets/icon/icon.jpeg')" alt="IOM-ITB" class="w-full md:w-1/2 object-cover p-4 md:p-20">
      <div class="w-full md:w-1/2 text-justify p-4 md:p-0">
        <h4 class="text-[24px] md:text-[50px] capitalize text-main font-[700]">Berdonasi Bersama IOM-ITB</h4>
        <p class="font-[500] text-[14px] md:text-[16px] text-main whitespace-pre-line">
          {{ "Setiap tahunnya, Institut Teknologi Bandung menerima ribuan mahasiswa dari berbagai provinsi di Indonesia. Mereka masuk ke ITB melalui tiga jalur penerimaan, di antaranya SNBP, SNBT, Seleksi Mandiri dan ITB International Undergraduate Program (IUP).\n\nKita memahami, para mahasiswa yang belajar di ITB memiliki latar belakang ekonomi yang berbeda dan  ITB tidak ingin membatasi kesempatan belajar bagi mahasiswanya karena masalah finansial. Untuk itu, berbagai fasilitas beasiswa disediakan oleh ITB untuk membantu mahasiswa yang kesulitan di bidang ekonomi, salah satunya adalah bantuan dan beasiwa IOM. Bantuan dan Beasiswa yang disalurkan IOM melalui ITB berasal dari Iuran dan kontribusi para Orang Tua Mahasiswa. IOM mengajak para Orang Tua Mahasiswa untuk turut berkontribusi dalam membantu Mahasiswa yang memerlukan dukungan baik secara finansial ataupun non finansial." }}
        </p>
        <br>
        <div class="w-fit text-center">
        <img :src="require('@/assets/image/ketua-umum-iom.png')" alt="Ketua Umum Iom" class="w-[500px]">
        <span class="text-gray-500">Ketua Umum - Hendro Setyanto, S.Si., M.Si.</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderItem from "@/components/header/HeaderItem.vue";
import FormDonation from "@/components/form/FormDonation.vue";

export default {
  components: {
    HeaderItem,
    FormDonation
  },
  setup() {
    return {};
  },
  data() {
    return {
      history: "IOM-ITB merupakan perkumpulan Orang Tua Mahasiswa ITB yang menjadi salah satu mitra Institut Teknologi Bandung.\n\nBerdiri sejak tanggal 14 Juli 1968, dan digagas oleh istri-istri dosen ITB atas dasar kepedulian terhadap kondisi mahasiswa yang terkendala biaya dalam melaksanakan studinya selama perkuliahan berlangsung.\n\nDISAHKAN SEBAGAI BADAN HUKUM : Pada tanggal 16 Desember 1974 berdasarkan: \nSurat Keputusan Pengadilan Negeri Kelas I Bandung \nNo: 1/1974/PBH/Bdg.\n\n",
      functionality: "IOM-ITB berfungsi sebagai mitra ITB, khususnya dalam pembinaan kelangsungan pendidikan yang bersifat sosial dan kekeluargaan.\n\n",
      goals: "IOM-ITB bermaksud dan bertujuan ikut serta membina mahasiswa, dengan menjalin hubungan antar sesama orangtua mahasiswa, menghimpun, menampung dan menyalurkan daya dan usaha.",
      activity: [
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2021",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2023",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2021",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2023",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2021",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
        {
          image: "slide1.png",
          title: "Noteworthy technology acquisition 2023",
          description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
          url: "/",
        },
      ],
      isOpen: false
    };
  },
  computed: {},
  methods: {
    openPopup() {
        this.isOpen = true
    },
    closePopup() {
        this.isOpen = false
    }
  },
};
</script>

<style scoped>
.bg-colorSecond {
  background-color: #f3f4f6;
}
.bg-main {
  background-color: #1c3faa;
}
.text-main {
  color: #1c3faa;
}
</style>
