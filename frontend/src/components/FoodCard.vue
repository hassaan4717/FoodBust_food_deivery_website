<template>
  <section>
    <div
      class="bg-gray-100 w-80 h-90 rounded-lg overflow-hidden shadow my-4 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-900 hover:text-white"
    >
      <img class="w-full h-52 object-cover" :src="productImageUrl" alt="Product Image" />
      <div class="flex flex-col justify-center items-center mt-4">
        <div><span>{{ product.name }}</span></div>
        <div><span>Price: Rp. {{ product.price }}</span></div>
        <div><span>Ready: {{ product.is_ready ? 'Yes' : 'No' }}</span></div>

        <div class="mt-3">
          <button
            @click="viewDetails"
            class="rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wide text-white bg-green-400 hover:bg-green-500 w-24 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

export default {
  name: 'FoodCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Build your image URL according to where static assets are served
    productImageUrl() {
      return `/assets/images/${this.product.gambar}`
    }
  },
  methods: {
    ...mapActions(['getProductById']),
    viewDetails() {
      if (!this.product.is_ready) {
      //alert('This product is not ready yet!');
      Vue.toasted.error('This product is not ready yet!', { message: 'This product is not ready yet!', duration: 1000 });
      
      return;
  }
      // Dispatch Vuex action to fetch product by ID, then navigate via the action/router
      this.getProductById(this.product.id)
    }
  }
}
</script>


