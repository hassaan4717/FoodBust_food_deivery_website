<template>
  <div>
    <AdminNav />

    <section class="container mx-auto mt-4">
      <h1 class="text-2xl font-bold mb-4">Registered Users</h1>

      <div v-if="allUsers.length === 0" class="text-center text-gray-600">
        No users found.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <div
          v-for="(user, index) in allUsers"
          :key="user.id"
          class="bg-white p-4 rounded shadow border transform transition duration-300 hover:shadow-lg hover:scale-105 hover:bg-slate-100"
        >
          <h2 class="text-lg font-semibold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-600"><strong>Email:</strong> {{ user.email }}</p>
          <p class="text-gray-600"><strong>Phone:</strong> {{ randomPhones[index] }}</p>
          <p class="text-gray-600"><strong>Address:</strong> {{ randomAddresses[index] }}</p>
          <p class="text-gray-600"><strong>Created:</strong> {{ randomDates[index] }}</p>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdminNav from '../components/AdminNav.vue';

export default {
  name: 'seeUsers',
  components: {
    AdminNav
  },
  data() {
    return {
      randomPhones: [],
      randomAddresses: [],
      randomDates: []
    };
  },
  computed: {
    ...mapState(['allUsers'])
  },
  methods: {
    ...mapActions(['getAllUsers']),
    generateMockData() {
      const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Quetta', 'Peshawar'];
      this.randomPhones = this.allUsers.map(() =>
        '03' + Math.floor(100000000 + Math.random() * 900000000).toString()
      );
      this.randomAddresses = this.allUsers.map(() =>
        `${cities[Math.floor(Math.random() * cities.length)]}, Pakistan`
      );
      this.randomDates = this.allUsers.map(() => {
        const start = new Date(2023, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toLocaleDateString();
      });
    }
  },
  async mounted() {
    await this.getAllUsers();
    this.generateMockData(); // Add mock info after real users are fetched
  }
};
</script>

