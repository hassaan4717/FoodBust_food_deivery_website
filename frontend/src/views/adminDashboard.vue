<template>
  <div>
    <AdminNav />

    <section class="container mx-auto mt-4">
      <h1 class="text-2xl font-bold mb-6">Pending Orders</h1>

      <div v-if="pendingOrders.length === 0" class="text-center text-gray-600">
        No pending orders.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="order in pendingOrders"
    :key="order.id"
    class="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-200 p-6"
  >
    <!-- 🧾 Order Info -->
    <div class="mb-4">
      <h2 class="text-xl font-bold text-green-700 mb-2">Order #{{ order.id }}</h2>
      <div class="text-sm text-gray-600 space-y-1">
        <p><span class="font-semibold">User:</span> {{ order.user_name }}</p>
        <p><span class="font-semibold">Email:</span> {{ order.email }}</p>
        <p><span class="font-semibold">Delivery Address:</span> {{ order.table_no }}</p>
      </div>
    </div>

    <!-- 🍽️ Items -->
    <div v-if="order.items && order.items.length" class="mt-4">
      <h3 class="text-sm font-semibold text-gray-800 border-b pb-1 mb-2">Items</h3>
      <ul class="space-y-3">
        <li
          v-for="(item, index) in order.items"
          :key="index"
          class="bg-gray-50 p-3 rounded border border-gray-100"
        >
          <p class="text-gray-900 font-medium text-sm">{{ item.name }}</p>
          <p class="text-gray-600 text-sm">Desc: {{ item.description }}</p>
          <p class="text-gray-700 text-sm"><strong>Qty:</strong> {{ item.total_booking }}</p>
          <p class="text-gray-700 text-sm"><strong>Price:</strong> {{ item.price }}</p>
        </li>
      </ul>
    </div>

    <!-- ✅ Action Button -->
    <button
      @click="processOrder(order.id)"
      class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
    >
      Process Order
    </button>
  </div>
</div>

      
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminNav from '../components/AdminNav.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AdminNav
  },
  computed: {
    ...mapState(['pendingOrders'])
  },
  methods: {
    ...mapActions(['getPendingOrders', 'processOrder'])
  },
  async mounted() {
    await this.getPendingOrders();
  }
};
</script>
