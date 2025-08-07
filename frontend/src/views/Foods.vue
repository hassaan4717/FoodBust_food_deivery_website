<template>
  <div class="picture1">
        <div class="container mx-auto">
    <NavbarVue />
  <section>
    <div class="container mx-auto my-12">
      <div class="flex mx-32">
        <div class="text-2xl">
          <h2>Menu</h2>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <label class="text-xl font-bold mb-8" for="search_food">Find Food</label>
        <div class="quote-box">
          <p class="quote">
                “where your fridge is jealous and your diet’s on life support.”
          </p>
          <small class="author">— We say, so we don’t have to apologize later.</small>
      </div>
    </div>

    <div class="flex justify-around my-8">
      <div class="grid grid-cols-3 gap-x-8 mx-32">
        <div v-for="product in products" :key="product.id">
          <FoodCard :product="product" />
        </div>
      </div>
    </div>
  </section>
  </div>
  </div>
  
</template>

<script>

import FoodCard from '../components/FoodCard.vue'
import { mapState, mapActions } from 'vuex';
import NavbarVue from '../components/Navbar.vue';
export default {
  name: 'Foods',
  components: {
    NavbarVue,
    FoodCard
  },
  data() {
    return {
      search: ''
    };
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['getProducts', 'searchFood']),
    handleSearch() {
      if (this.search.trim()) {
        this.searchFood(this.search.trim());
      } else {
        this.getProducts();
      }
    }
  },
  async mounted() {
    await this.getProducts();
  }
}

</script>

<style>
   .picture1{
        background-image: url('../assets/images/Food.jpg');
        background-size: cover;
        background-position: center;
        /* background-repeat: no-repeat; */
    }
    .quote-box {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-left: 6px solid #34d399;
  color: #333;
  font-family: 'Georgia', serif;
  text-align: center;
}

.quote {
  font-size: 1.5rem;
  font-style: italic;
  color: #2c3e3a;
  margin-bottom: 1rem;
}

.author {
  font-size: 1rem;
  color: #555;
}

</style>