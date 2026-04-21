<template>
  <div class="bg-white pt-[10px] pb-[32px] px-[18px] md:px-[70px]">
    <h2 class="text-main font-[800] text-[32px] md:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center md:text-start">Latar Belakang</h2>
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="w-full text-justify">
        <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700]">Sejarah</h4>
        <p class="font-[500] text-[14px] md:text-[16px] text-main whitespace-pre-line">
        {{ history }}
        </p>
        <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700]">Fungsi</h4>
        <p class="font-[500] text-[14px] md:text-[16px] text-main whitespace-pre-line">
        {{ functionality }}
        </p>
        <h4 class="text-[24px] md:text-[26px] capitalize text-main font-[700]">Maksud dan Tujuan</h4>
        <p class="font-[500] text-[14px] md:text-[16px] text-main whitespace-pre-line">
        {{ goals }}
        </p>
      </div>
      <img :src="require('@/assets/image/IOM-ITB-PrimaryLogo-blue.png')" alt="IOM-ITB" class="w-full md:w-1/2 object-cover p-4 md:p-20 hidden md:block">
    </div>
  </div>

  <div class="border w-[90%] mx-auto opacity-50"></div>

  <div class="bg-white p-[16px] md:p-[24px]">
    <h2 class="text-main font-[800] text-[16px] md:text-[24px] lg:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center">Ruang Lingkup Kegiatan IOM-ITB</h2>
    <div class="flex w-full flex-wrap">
     <img :src="require('@/assets/image/lingkup1.png')" class="md:w-1/2" />
     <img :src="require('@/assets/image/lingkup2.png')" class="md:w-1/2" />
    </div>
  </div>

  <div class="bg-white p-[16px]">
    <h2 class="text-main font-[800] text-[16px] md:text-[24px] lg:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center">Pembinaan Mahasiswa dan Konseling</h2>
    <div class="flex w-full flex-wrap">
     <img :src="require('@/assets/image/pembinaan1.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/pembinaan2.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/pembinaan3.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/pembinaan4.png')" class="md:w-1/4" />
    </div>
  </div>

  <div class="border w-[90%] mx-auto opacity-50"></div>

  <div class="bg-white p-[16px]">
    <h2 class="text-main font-[800] text-[16px] md:text-[24px] lg:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center">Keanggotaan IOM</h2>
    <div class="flex w-full flex-wrap">
     <img :src="require('@/assets/image/keanggotaan.png')" />
    </div>
  </div>

  <div class="bg-white p-[16px]">
    <h2 class="text-main font-[800] text-[16px] md:text-[24px] lg:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center">Perangkat Organisasi</h2>
    <div class="flex w-full flex-wrap">
      <img :src="require('@/assets/image/perangkat1.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/perangkat2.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/perangkat3.png')" class="md:w-1/4" />
     <img :src="require('@/assets/image/perangkat4.png')" class="md:w-1/4" />
    </div>
  </div>

  <div class="border w-[90%] mx-auto opacity-50"></div>

  <div class="bg-white py-[16px] px-[8px] sm:px-[18px] md:px-[70px]">
    <h2 class="text-main font-[800] text-[16px] md:text-[24px] lg:text-[50px] leading-tight md:leading-[65.1px] py-[16px] text-center">PENGURUS PUSAT HARIAN IKATAN ORANGTUA MAHASISWA - INSTITUT TEKNOLOGI BANDUNG PERIODE 2023 - 2027</h2>
    <div class="flex justify-center items-center">
      <img :src="require('@/assets/image/struktur-organisasi.png')" alt="Struktur Organisasi" class="w-full object-cover p-0 lg:p-20">
    </div>
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
</template>

<script>
import HeaderItem from "@/components/header/HeaderItem.vue";

export default {
  components: {
    HeaderItem,
  },
  setup() {
    return {};
  },
  data() {
    return {
      history:"IOM-ITB merupakan perkumpulan Orang Tua Mahasiswa ITB yang menjadi salah satu mitra Institut Teknologi Bandung.\n\nBerdiri sejak tanggal 14 Juli 1968, dan digagas oleh istri-istri dosen ITB atas dasar kepedulian terhadap kondisi mahasiswa yang terkendala biaya dalam melaksanakan studinya selama perkuliahan berlangsung.\n\nDISAHKAN SEBAGAI BADAN HUKUM : Pada tanggal 16 Desember 1974 berdasarkan: \nSurat Keputusan  Pengadilan Negeri Kelas I Bandung \nNo: 1/1974/PBH/Bdg.\n\n",
      functionality:"IOM-ITB berfungsi sebagai mitra ITB, khususnya dalam pembinaan kelangsungan pendidikan yang bersifat sosial dan kekeluargaan.\n\n",
      goals:"IOM-ITB bermaksud dan bertujuan ikut serta membina mahasiswa, dengan menjalin hubungan antar sesama orangtua mahasiswa, menghimpun, menampung dan menyalurkan daya dan usaha.",
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.blue {
  border-color: #003A6E;
}
</style>
