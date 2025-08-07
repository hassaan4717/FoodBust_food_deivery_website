<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md">
    <div class="container mx-auto mt-4">
      <div class="flex items-center justify-between">
        <div class="admin-brand-container">
          <h1 class="admin-logo">Food<span>Bust</span> <span class="admin-label">Admin</span></h1>
          <strong class="username">{{ this.$store.state.user.name }}</strong>
        </div>

        <div v-if="isLoggedIn">
          <ul class="flex">
            <li class="px-4 py-5">
              <router-link to="/adminDashboard">📊</router-link>
            </li>
            <li class="px-4 py-5">
              <router-link to="/food_items">🍔</router-link>
            </li>
            <li class="px-4 py-5">
              <router-link to="/users">👥</router-link>
            </li>
            <li class="px-4 py-5">
              <button @click="logout" class="text-red-500 hover:text-red-700">
                🔓 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
//import { inject } from '@vue/composition-api';

export default {
  name: 'AdminNav',
 
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout'])
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;800&display=swap');

.admin-brand-container {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
  height: 60px;
  overflow: hidden;
}

.admin-logo {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #34D399, #0b6346, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-logo span:first-of-type {
  color: #FF5722;
}

.admin-label {
  font-size: 1rem;
  color: #2f333b; /* gray-500 */
  font-weight: 600;
  margin-left: 4px;
}

.username {
  margin-left: 15px;
  font-size: 1rem;
  color: #1e7857;
  font-weight: bold;
  animation: pulse 1s infinite alternate;
  white-space: nowrap;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}

</style>