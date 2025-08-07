<template>
  <div class="picture1 min-h-screen">
    <AdminNav />

    <section class="container mx-auto mt-10 max-w-2xl px-6">
      <div class="backdrop-blur-md bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 class="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
          Update Product
        </h1>

        <form @submit.prevent="submitUpdate" class="space-y-6">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Product Name</label>
            <input v-model="name" type="text" required class="input-field" placeholder="Enter product name" />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Product Code</label>
            <input v-model="code" type="text" required class="input-field" placeholder="Enter product code" />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Price (Rs)</label>
            <input v-model.number="price" type="number"
              min="1" required class="input-field" placeholder="Enter price" />
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Is Ready</label>
            <select v-model="is_ready" required class="input-field">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Image File Name</label>
            <input v-model="gambar" type="text" required class="input-field" placeholder="e.g., item.jpg" />
            <p v-if="!isImageValid" class="text-red-500 text-sm mt-1">
              Image name must end with <strong>.png</strong> or <strong>.jpg</strong>
            </p>
          </div>

          <div class="flex justify-between flex-wrap gap-4">
            <button
              type="submit"
              class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
              :disabled="!isImageValid"
            >
              Update Product
            </button>

            <button
              @click="$router.push('/food_items')"
              class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminNav from '../components/AdminNav.vue';

export default {
  name: 'UpdateProduct',
  components: {
    AdminNav
  },
  computed: {
    ...mapState(['product']),
    isImageValid() {
      return /\.(png|jpg)$/i.test(this.gambar);
    }
  },
  data() {
    return {
      id: null,
      code: '',
      name: '',
      price: '',
      is_ready: false,
      gambar: ''
    };
  },
  methods: {
    ...mapActions(['updateProduct']),
    async submitUpdate() {
      const { id, code, name, price, is_ready, gambar } = this;
      await this.updateProduct({ id, code, name, price, is_ready, gambar });
      this.$router.push('/food_items');
    },
    prefillForm() {
      if (this.product) {
        this.id = this.product.id;
        this.code = this.product.code;
        this.name = this.product.name;
        this.price = this.product.price;
        this.is_ready = this.product.is_ready;
        this.gambar = this.product.gambar;
      }
    }
  },
  mounted() {
    this.prefillForm();
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white transition-all;
}
.picture1 {
  background-image: url('../assets/images/Food.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
