<template>
  <div class="auth-container">
    <!-- Background Video -->
    <video class="bg-video" autoplay muted loop playsinline>
      <source src="@/assets/images/Yellow_and_White_Minimalist_Food_Video.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>

    <!-- Login Form -->
    <div class="form-box">
      <h2>Login</h2>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>

      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
      <p>Login as admin? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.email.trim().toLowerCase().endsWith('@admin.com')) {
        Vue.toasted.error(
          'This DOMAIN is reserved for admin. Please use the admin login page.',
          { duration: 2000 }
        );
        return;
      }

      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.auth-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Fullscreen Video */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Right-aligned Login Form */
.auth-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: -1;
}

.form-box {
  position: absolute;
  right: 15%; /* adjust this as needed */
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4); /* semi-transparent dark background */
  backdrop-filter: blur(10px); /* blur for glass effect */
  -webkit-backdrop-filter: blur(10px);
  padding: 35px 30px;
  border-radius: 12px;
  text-align: center;
  color: #fff; /* white text */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.form-box input {
  display: block;
  width: 100%;
  margin: 15px 0;
  padding: 12px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: #fff;
}

.form-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-box button {
  padding: 12px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2); /* light glass look */
  color: white;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.form-box button:hover {
  background-color: rgba(255, 255, 255, 0.35);
}

.form-box a {
  color: #fff;
  font-weight: 500;
  text-decoration: underline;
}

</style>
