<template>
  <div class="picture1">
    <AdminNav />

    <section class="container mx-auto mt-6 px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-black">All Products</h1>
        <button
          @click="goToAddProduct"
          class="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded shadow text-white font-semibold"
        >
          + Add New Product
        </button>
      </div>

      <div v-if="products.length === 0" class="text-center text-gray-400">
        No products available.
      </div>

      <!-- Smaller cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-[#2e0202] rounded-lg shadow-md border border-green-800 overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
        >
          <img
            :src="getImageUrl(product.gambar)"
            alt="Product Image"
            class="w-full h-36 object-cover"
          />
          <div class="p-3">
            <h2 class="text-base font-semibold mb-1 text-black tracking-wide truncate">{{ product.name }}</h2>
            <p class="text-slate-300 text-sm"><strong class="text-slate-400">Code:</strong> {{ product.code }}</p>
            <p class="text-slate-300 text-sm"><strong class="text-slate-400">Price:</strong> Rs. {{ product.price }}</p>
            <p class="text-slate-300 text-sm">
              <strong class="text-slate-400">Ready:</strong> {{ product.is_ready ? 'Yes' : 'No' }}
            </p>

            <div class="mt-3 flex justify-between">
              <button
                @click="updateProduct(product.id)"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
              >
                Update
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import AdminNav from '../components/AdminNav.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'seeProduct',
  components: {
    AdminNav
  },
  computed: {
    ...mapState(['products']),
    
  },
  methods: {
    ...mapActions(['getProducts', 'deleteProduct', 'getProductById']),
    
    updateProduct(id) {
      this.getProductById(id);
    },

    getImageUrl(gambar) {
    return `/assets/images/${gambar}`; // public/ is implied in Vue, don't add it
    },

    goToAddProduct() {
      this.$router.push('/addProduct');
    }
  },
  async mounted() {
    await this.getProducts();
  }
};
</script>

<style scoped>
.picture1{
        background-image: url('../assets/images/Food.jpg');
        background-size: cover;
        background-position: center;
        /* background-repeat: no-repeat; */
    }
</style>
