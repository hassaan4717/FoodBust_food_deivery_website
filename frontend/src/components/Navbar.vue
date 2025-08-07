<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md">
    <div class="container mx-auto mt-4">
      <div class="flex items-center justify-between">
        <div class="nav-brand-container">
          <h1 class="welcome-text">Welcome to</h1>
          <h1 class="foodbust-logo">Food<span>Bust</span></h1>

          <strong class="username">
            <span v-if="$store.state.user.name === 'Hitler'"
              >卐 {{ $store.state.user.name }}!</span
            >
            <span v-else>{{ $store.state.user.name }}!</span>
          </strong>
        </div>

        <div v-if="isLoggedIn">
          <ul class="flex">
            <li class="px-4 py-5">
              <router-link to="/home">🏠</router-link>
            </li>
            <li class="px-4 py-5">
              <router-link to="/foods">🥗</router-link>
            </li>
            <li class="px-4 py-5">
              <router-link to="/basket">🛒</router-link>
              <span class="bg-yellow-200 rounded-full px-2 mx-1">
                {{ basketCount }}
              </span>
            </li>
            <li class="px-4 py-5">
              <router-link to="/userPendingOrder">📦</router-link>
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
import { mapGetters, mapActions } from "vuex";
//import { inject } from '@vue/composition-api';

export default {
  name: "Navbar",

  computed: {
    ...mapGetters(["isLoggedIn", "basketCount"]),
  },
  methods: {
    ...mapActions(["logout", "getBasket"]),
  },
  mounted() {
    if (this.isLoggedIn) {
      this.getBasket();
    }
  },
};
</script>

<style>
/* Import if not already present */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap");

.nav-brand-container {
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  gap: 8px;
  padding: 0.5rem 1rem;
  height: 60px;
  overflow: hidden;
}

.welcome-text {
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563; /* gray-700 */
  margin: 0;
}

.foodbust-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #34d399, #10b981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.foodbust-logo span {
  color: #ff5722;
}

.username {
  font-size: 1rem;
  color: #1e7857;
  margin-left: 15px;
  font-weight: bold;
  animation: pulse 1s infinite alternate;
  white-space: nowrap;
}

/* Subtle breathing animation for username */
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