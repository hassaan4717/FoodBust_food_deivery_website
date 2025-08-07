
<template>
  <div>
    <NavbarVue />

    <!-- Pending Orders Section -->
    <section class="px-6 py-8 max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-8 text-gray-800">Your Pending Orders</h2>

      <!-- 💤 Empty State -->
      <div v-if="pendingOrders.length === 0" class="text-gray-500 text-center py-12 bg-white rounded shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-6h6v6m-3-12h.01M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <p class="text-lg">You have no pending orders.</p>
      </div>

      <!-- ✅ Orders List -->
      <div v-else class="space-y-8">
        <div
          v-for="order in pendingOrders"
          :key="order.id"
          class="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition"
        >
          <!-- Order Meta -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-green-600">Order ID: #{{ order.id }}</h2>
            <span class="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full uppercase font-semibold tracking-wide">Pending</span>
          </div>

          <!-- User Info -->
          <div class="text-sm text-gray-700 space-y-1 mb-4">
            <p><strong>Name:</strong> {{ user && user.name }}</p>
            <p><strong>Email:</strong> {{ user && user.email }}</p>
            <p><strong>Delivery Address:</strong> {{ order.table_no }}</p>
          </div>

          <!-- Order Items -->
          <div v-if="order.items && order.items.length">
            <h3 class="text-base font-semibold mb-2 border-b pb-1 text-gray-800">Ordered Items</h3>
            <ul class="divide-y divide-gray-200">
              <li
                v-for="(item, index) in order.items"
                :key="index"
                class="py-3 flex justify-between items-start"
              >
                <div class="space-y-1">
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-gray-500 text-sm">Price: {{ item.price }}</p>
                  <p class="text-gray-500 text-sm">Desc: {{ item.description }}</p>
                </div>
                <div class="text-sm text-gray-700">
                  <p><strong>x{{ item.total_booking }}</strong></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarVue from '../components/Navbar.vue'

export default {
  name: 'userPendingOrder',
  components: {
    NavbarVue
  },
  computed: {
    pendingOrders() {
      return this.$store.getters.userPendingOrders;
    },
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.$store.dispatch('getUserPendingOrders');
  }
}
</script>

<style scoped>
/* .order-confirmation {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background: rgba(36, 52, 43, 0.8);
  color: #f2f2f2;
  border-radius: 8px;
  border-left: 6px solid #34d399;
  text-align: center;
}

.order-confirmation .sassy {
  font-size: 1.2rem;
  color: #cbd5c4;
} */
</style>
