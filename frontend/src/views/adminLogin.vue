<template>
  <div class="auth-container">
    <!-- Background Video -->
    <video class="bg-video" autoplay muted loop playsinline>
      <source src="../assets/images/Yellow_and_White_Minimalist_Food_Video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Admin Login Form -->
    <div class="form-box">
      <h2>Admin Login</h2>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
      <p>
        Login in as customer? <router-link to="/">Login</router-link>
      </p>
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
      if (!this.email.trim().toLowerCase().endsWith('@admin.com')) {
        Vue.toasted.error('Only @admin.com DOMAINS are allowed for admin login.', {
          message: 'Only @admin.com DOMAINS are allowed for admin login.',
          duration: 2000
        });
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10%;
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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 35px 30px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  width: 300px;
  z-index: 2;
}

/* Input fields */
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

/* Button styling */
.form-box button {
  padding: 12px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
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
