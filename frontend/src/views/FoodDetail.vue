<template>
  <div class="picture2">
    <NavbarVue />
         <section>
    <!-- Breadcrumb -->
    <div class="flex my-4 mx-32">
      <ul class="flex gap-1">
        <li><router-link to="/home">Home /</router-link></li>
        <li><router-link to="/foods">Foods /</router-link></li>
        <li class="font-semibold">{{ productName }}</li>
      </ul>
    </div>

    <!-- Product Details -->
    <div class="flex flex-row mx-32" v-if="product">
      <div>
        <img
          class="rounded-lg w-auto h-72"
          :src="productImageUrl()"
          alt="Product Image"
        />
      </div>

      <div class="ml-8">
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <hr class="my-2" />
        <h4>Price: <strong>Rp. {{ product.price }}</strong></h4>

        <form @submit.prevent="handleOrder">
          <div class="flex flex-col">
            <label class="my-1" for="total_booking">Quantity</label>
            <input
              class="rounded border-2"
              v-model.number="order.total_booking"
              type="number"
              min="1"
              required
            />
          </div>

          <div class="flex flex-col my-4">
            <label class="my-1">Description</label>
            <textarea
              v-model="order.description"
              class="rounded border-2"
              placeholder="e.g., spicy, extra rice"
              rows="2"
              cols="23" 
            ></textarea>
          </div>
          <div class="my-2">
            <button
            type="submit"
            class="rounded-lg py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wide text-white bg-green-400 w-24"
          >
            Order
          </button>
          </div>
         
        </form>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center mt-10">Loading product...</div>
  </section>
  </div>
 
</template>

<script>

import { mapState, mapActions } from 'vuex'
import NavbarVue from '../components/Navbar.vue'

export default {
  name: 'FoodDetail',
  components: {
    NavbarVue
  },
  data() {
    return {
      order: {
        product_id: null,
        total_booking: 1,
        description: ''
      }
    }
  },
  computed: {
    ...mapState(['product']),
    productName() {
      return this.product && this.product.name
        ? this.product.name
        : 'Loading...'
    }
  },
  methods: {
    ...mapActions(['addToBasket']),
    productImageUrl() {
      return `/assets/images/${this.product.gambar}`
    },
    handleOrder() {
      if (!this.product) return

      const payload = {
        user_id: this.$store.state.user.id,
        product_id: this.product.id,
        total_booking: this.order.total_booking,
        description: this.order.description
      }

      this.addToBasket(payload).then(() => {
        //this.$router.push('/basket')
      })
    }
  }
}

</script>

<style>
.picture2{
        background-image: url('../assets/images/Food.jpg');
        height: 115vh;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>