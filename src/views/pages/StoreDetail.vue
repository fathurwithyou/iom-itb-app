<template>
  <div class="bg-colorSecond pt-[10px] pb-[32px] px-[18px] md:px-[70px]">
    <div
      v-if="isLoading"
      class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6 text-center text-gray-600"
    >
      Memuat detail produk...
    </div>

    <div
      v-else-if="merchandiseError"
      class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6 text-center"
    >
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Produk tidak tersedia</h1>
      <p class="text-gray-600 mb-6">{{ merchandiseError }}</p>
      <a
        href="/merchandise"
        class="inline-flex items-center px-5 py-2 text-white bg-main rounded-lg hover:bg-blue-800"
      >
        Kembali ke daftar merchandise
      </a>
    </div>

    <template v-else>
      <!-- Merchandise Details -->
      <div class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow p-6">
        <div class="flex flex-col md:flex-row">
          <div class="flex-shrink-0">
            <img
              v-if="currentMerchandise?.image"
              :src="currentMerchandise.image"
              :alt="currentMerchandise.name"
              class="rounded-lg w-full md:w-[300px] h-auto"
            />
            <img
              v-else
              :src="require('@/assets/image/default.png')"
              alt="No Image"
              class="rounded-lg w-full md:w-[300px] h-auto"
            />
          </div>
          <div class="flex-1 mt-4 md:mt-0 md:ml-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ currentMerchandise.name }}</h1>
            <p class="text-gray-700 mb-4">{{ currentMerchandise.description }}</p>
            <p class="text-2xl font-bold text-main mb-4">{{ formatPrice(currentMerchandise.price) }}</p>
            <p class="text-gray-500 mb-6">Stok: {{ currentMerchandise.stock }}</p>

            <!-- Quantity Input -->
            <div class="mb-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700">Jumlah Produk</label>
              <input
                type="number"
                id="quantity"
                v-model.number="quantity"
                min="1"
                :max="currentMerchandise.stock"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- User Information Form -->
      <div class="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6 max-w-3xl mx-auto">
        <h2 class="text-xl font-bold mb-4">Informasi Pembeli</h2>

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          id="name"
          v-model="userInfo.name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="userInfo.email"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="noTelp" class="block text-sm font-medium text-gray-700">No. Telepon</label>
        <input
          type="text"
          id="noTelp"
          v-model="userInfo.noTelp"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
        <textarea
          id="address"
          v-model="userInfo.address"
          required
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Upload Bukti Pembayaran</label>
        <span class="block text-sm font-medium text-gray-500">No Rek. 12345678 a/n. suka (BCA)</span>
       <span class="block text-sm font-medium text-gray-500">Total Pembayaran: {{ formatPrice(quantity * currentMerchandise.price) }}</span>
        <input
          type="file"
          ref="file"
          name="file"
          id="payment"
          @change="onChange"
          required
          class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main focus:border-main sm:text-sm hidden"
        />

        <!-- Image Preview -->
        <label 
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
          for="payment" 
          :class="`cursor-pointer hover:opacity-[0.8] ${ isDragging ? 'opacity-[0.8]' : ''}`"
          >
          <img v-if="file.length" :src="generateURL(file[0] || '')" alt="Preview" class="rounded-lg w-full h-auto mt-1" />
          <div v-else class="mt-1 w-full h-[120px] border border-gray-400 border-dashed rounded-[8px] flex justify-center items-center">
            <div  class="text-center">
            <p class="text-gray-600 text-[14px] flex items-center gap-2 font-[600]"><img :src="require('@/assets/icon/upload.svg')" alt="icon" class="rounded-lg w-[14px] h-auto" />Click to choose a file or drag here</p>
            <p class="text-gray-600 text-[11px]">Accepts .jpg, .jpeg, .png, .pdf files</p>
            <p class="text-gray-600 text-[11px]">Size limit: 5 MB</p>
          </div>
          </div>
        </label>
      </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
            type="button"
            @click="submitCheckout"
            class="inline-flex items-center px-5 py-2 text-white bg-main rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
          Pesan Sekarang
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { GET_MERCHANDISE_DETAIL } from "@/store/merchandises.module";
import { POST_TRANSACTION } from "@/store/transactions.module";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      isLoading: true,
      merchandiseError: "",
      quantity: 1,
      userInfo: {
        name: "",
        email: "",
        noTelp: "",
        address: "",
      },
      file: [],
      payment: "",
      isDragging: false, // Track if a file is being dragged over
    };
  },
  computed: {
    currentMerchandise() {
      return this.$store.getters.currentMerchandise?.data || {};
    },
    merchandiseId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      this.merchandiseError = "";

      try {
        await this.$store.dispatch(GET_MERCHANDISE_DETAIL, {
          id: this.merchandiseId,
        });
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 404) {
          this.merchandiseError = "Produk yang Anda cari tidak ditemukan.";
        } else if (err?.response?.status === 400) {
          this.merchandiseError = "Permintaan produk tidak valid.";
        } else {
          this.merchandiseError = "Detail produk tidak dapat dimuat saat ini.";
        }
      } finally {
        this.isLoading = false;
      }
    },
    formatPrice(price) {
      return parseFloat(price).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.payment = file;

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result; // Set the preview image URL
        };
        reader.readAsDataURL(file); // Read the file as a data URL for preview
      } else {
        this.previewImage = null; // Clear the preview if no file is selected
      }
    },
    onChange() {
      const self = this;
      let incomingFiles = Array.from(this.$refs.file.files);
      const fileExist = self.file.some((r) =>
        incomingFiles.some(
          (file) => file.name === r.name && file.size === r.size,
        ),
      );
      const fileRequired = incomingFiles.some((file) =>
        ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(
          file.type,
        ),
      );

      if (!fileRequired) {
        Swal.fire({
          title: "Upload File",
          text: "Format file must .pdf, .jpg, .jpeg, or .png.",
          icon: "warning",
        });
        return;
      }

      if (incomingFiles.length > 1 || self.file.length == 1) {
        Swal.fire({
          title: "Upload File",
          text: "Upload file must be 1 items.",
          icon: "warning",
        });
        return;
      }

      if (fileExist) {
        self.showMessage = true;
        Swal.fire({
          title: "Upload File",
          text: "New upload contains files that already exist.",
          icon: "warning",
        });
        return;
      }

      self.file = incomingFiles;
      this.payment = incomingFiles[0];
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return ["image/jpg", "image/jpeg", "image/png"].includes(file.type)
        ? fileSrc
        : '';
    },
    async submitCheckout() {
      if (
        this.quantity <= 0 ||
        this.quantity > this.currentMerchandise.stock ||
        !this.userInfo.name ||
        !this.userInfo.email ||
        !this.userInfo.noTelp ||
        !this.userInfo.address ||
        !this.payment
      ) {
        Swal.fire({
          title: "Required!",
          text: "Complete all forms correctly.",
          icon: "warning",
        });
        return;
      }

      const formData = {
        data: {
          merchandiseId: this.currentMerchandise.id,
          username: this.userInfo.name,
          email: this.userInfo.email,
          noTelp: this.userInfo.noTelp,
          address: this.userInfo.address,
          qty: this.quantity,
          payment: this.payment,
        },
      };

      const confirmCheckout = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceed!',
      });

      if (confirmCheckout.isConfirmed) {
        try {
          const response = await this.$store.dispatch(POST_TRANSACTION, formData);
          await Swal.fire({
            title: "Checkout!",
            text: "Your item has been checked out.",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.href = `/transaction?q=${response?.data?.code}`;
        } catch (error) {
          await Swal.fire({
            title: "Error!",
            text: "There was a problem with your transaction.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    },
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
