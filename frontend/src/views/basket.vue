<template>
  <div class="backg">
    <NavbarVue />
    <section>
  <div class="container mx-auto px-6 mt-10 flex flex-col md:flex-row gap-8">
    
    <!-- 🛒 Basket Table (Left Side) -->
    <div class="md:w-2/3 overflow-auto">
      <table class="table-fixed w-full border-2">
        <thead>
          <tr class="border-b-2">
            <th class="w-10">#</th>
            <th class="w-32">Picture</th>
            <th class="w-40">Food</th>
            <th class="w-32">Description</th>
            <th class="w-24">Quantity</th>
            <th class="w-24">Price</th>
            <th class="w-32">Total</th>
            <th class="w-24">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b-2 h-32" v-for="(item, index) in basket" :key="item.id">
            <th>{{ index + 1 }}</th>
            <td><img :src="productImageUrl(item.product.gambar)" class="rounded-lg w-20 h-20" alt="Product" /></td>
            <td class="text-center">{{ item.product.name }}</td>
            <td class="text-center">{{ item.description }}</td>
            <td class="text-center">{{ item.total_booking }}</td>
            <td class="text-center">Rp. {{ item.product.price }}</td>
            <td class="text-center">Rp. {{ item.product.price * item.total_booking }}</td>
            <td class="text-center">
              <button @click="deletebasket(item.id)"
                class="rounded-xl py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wide text-white bg-green-400">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 🧮 Total Price -->
      <div class="mt-4 text-right pr-4">
        <strong>Total Price: Rp. {{ totalPrice }}</strong>
      </div>
    </div>

    <!-- 💳 Checkout Form (Right Side) -->
    <div class="md:w-1/3 self-start p-4 bg-white bg-opacity-90 rounded shadow-md">
      <h2 class="text-lg font-bold mb-2">Checkout</h2>

      <label class="text-sm font-semibold">Your Name</label>
      <input v-model="order.customer_name" type="text" class="rounded border px-3 py-2 mb-2 w-full" required>

      <label class="text-sm font-semibold">Delivery Address</label>
      <input v-model="order.table_no" type="text" class="rounded border px-3 py-2 mb-2 w-full" required>

      <label class="text-sm font-semibold">Card Number</label>
      <input v-model="payment.cardNumber" type="text" maxlength="16" class="rounded border px-3 py-2 mb-2 w-full" placeholder="4242 4242 4242 4242" required>

      <div class="flex gap-2">
        <div class="flex-1">
          <label class="text-sm font-semibold">Expiry</label>
          <input v-model="payment.expiry" type="text" class="rounded border px-3 py-2 w-full" placeholder="MM/YY" required>
        </div>
        <div class="flex-1">
          <label class="text-sm font-semibold">CVV</label>
          <input v-model="payment.cvv" type="text" class="rounded border px-3 py-2 w-full" maxlength="3" required>
        </div>
      </div>

      <button
        @click.prevent="handleCheckout"
        class="mt-4 rounded-lg py-2 px-3 uppercase text-xs font-bold tracking-wide text-white bg-green-600 hover:bg-green-700 w-full"
      >
        Pay & Checkout
      </button>
    </div>

  </div>
</section>

  </div>
  
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import NavbarVue from '../components/Navbar.vue'
import Vue from 'vue' // ⬅️ Needed for toast

export default {
  name: 'Basket',
  components: {
    NavbarVue
  },
  data() {
    return {
      order: {
        customer_name: '',
        table_no: '',
        items: []
      },
      payment: {
        cardNumber: '',
        expiry: '',
        cvv: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapState(['basket']),
    ...mapGetters(['basketCount']),
    totalPrice() {
      return this.basket.reduce(
        (sum, item) => sum + item.product.price * item.total_booking,
        0
      )
    }
  },
  methods: {
    ...mapActions(['getBasket', 'removeFromBasket', 'checkout']),
    productImageUrl(filename) {
      return `/assets/images/${filename}`
    },
    deletebasket(id) {
      this.removeFromBasket(id)
    },
    handleCheckout() {
      // Validate dummy payment fields
      const { cardNumber, expiry, cvv } = this.payment;
      if (!cardNumber || !expiry || !cvv) {
        Vue.toasted.error('Please fill in card details.', { duration: 2000 });
        return;
      }

      // Prepare order items
      this.order.items = this.basket.map(item => ({
        product_id: item.product.id, // ✅ Use `product.id` instead of `product_id`
        total_booking: item.total_booking,
        description: item.description
      }));

      if (!this.order.customer_name || !this.order.table_no) {
        Vue.toasted.error('Please fill in name and address.', { duration: 2000 });
        return;
      }

      this.loading = true;

      // Simulate fake payment delay
      setTimeout(() => {
        this.checkout({
          user_id: this.$store.state.user.id,
          table_no: this.order.table_no,
          customer_name: this.order.customer_name,
          items: this.order.items
        }).then(() => {
          Vue.toasted.success('Payment successful! Order placed.', { duration: 2000 });

          // Clear form
          this.order = { customer_name: '', table_no: '', items: [] };
          this.payment = { cardNumber: '', expiry: '', cvv: '' };
        }).catch(() => {
          Vue.toasted.error('Failed to place order.', { duration: 2000 });
        }).finally(() => {
          this.loading = false;
        });
      }, 1500);
    }
  },
  mounted() {
    this.getBasket()
  }
}

</script>

<style>
.backg{
        background-image: url('../assets/images/Food.jpg');
        height: 100vh;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>