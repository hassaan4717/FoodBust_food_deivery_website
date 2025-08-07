<template>
  <div class="container mx-auto">
    <NavbarVue />
    <Hero />

    <div class="flex justify-between mx-32" >
      <h2 class="text-xl">Popular <strong>Foods</strong></h2>
      <router-link
        to="/foods"
        class="rounded-full py-2 px-3 uppercase text-xs font-bold text-white bg-green-400 tracking-wide"
      >
        See all
      </router-link>
    </div>

    <div class="flex justify-around mt-8">
      <div class="grid grid-cols-3 gap-8 mx-32">
        <FoodCard
          v-for="product in randomThreeProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>

import Hero from '@/components/Hero.vue'
import FoodCard from '@/components/FoodCard.vue'
import { mapState, mapActions } from 'vuex'
import NavbarVue from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    NavbarVue,
    Hero,
    FoodCard
  },
  computed: {
    ...mapState(['products']),
    randomThreeProducts() {
      const shuffled = [...this.products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(3, this.products.length));
    }
  },
  methods: {
    ...mapActions(['getProducts'])
  },
  async mounted() {
    await this.getProducts()
  }
}

// import Hero from '@/components/Hero.vue'
// import FoodCard from '@/components/FoodCard.vue'
// //import { mapState, mapActions } from 'vuex'
// import NavbarVue from '../components/Navbar.vue'

// import axios from 'axios'
// const APIURL = 'http://localhost:4000/home'; // Adjust the API

// export default {
//   name: 'Home',
//   components: {
//     NavbarVue,
//     Hero,
//     FoodCard
//   },
//   data() {
//     return {
//       bestProduct: []
//     }
//   },
//   methods: {
//     async getBestProducts() {
//      try {
//         const response = await axios.post('http://localhost:4000/home', {
//           transition: 'GET_BEST_PRODUCTS',
//          // data : null,
//         });
        
//         const result = response.data;
//         console.log('Best products success :', result.success);
//         console.log('FE Best products:', result.bestProducts);
//         if (result.success) {
//           console.log('success Best products:', result.bestProducts);
//           this.bestProduct = result.bestProducts;
//         } else {
//           console.error('Failed to fetch best products:', result.message);
//         }

//       } catch (error) {
//         console.error('Error fetching best products:', error);
//       }
//     }    
//   },
//   async mounted() {
//     await this.getBestProducts()
//   }
// }
</script>

