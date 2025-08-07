<template>
  <div class="picture1 min-h-screen">
    <AdminNav />

    <section class="container mx-auto mt-10 max-w-2xl px-6">
      <div class="backdrop-blur-md bg-white/80 dark:bg-gray-800/70 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 class="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
          Add New Product
        </h1>

        <form @submit.prevent="submitProduct" class="space-y-6">
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
            <label class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Image File Name (e.g., burger.jpg)
            </label>
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
              Add Product
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
import AdminNav from '../components/AdminNav.vue';
import { mapActions } from 'vuex';

export default {
  name: 'addProduct',
  components: {
    AdminNav
  },
  data() {
    return {
      code: '',
      name: '',
      price: '',
      is_ready: true,
      gambar: '',
    };
  },
  computed: {
    isImageValid() {
      return /\.(png|jpg)$/i.test(this.gambar);
    }
  },
  methods: {
    ...mapActions(['createProduct']),
    async submitProduct() {
      console.log('Submitting product:', {
        code: this.code,
        name: this.name,
        price: this.price,
        is_ready: this.is_ready,
        gambar: this.gambar
      });
      try {
        await this.createProduct({
          code: this.code,
          name: this.name,
          price: this.price,
          is_ready: this.is_ready,
          gambar: this.gambar
        });
        this.$router.push('/food_items');
      } catch (err) {
        console.error(err);
      }
    }
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
