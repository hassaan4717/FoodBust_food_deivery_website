

<template>
  <div>
    <NavbarVue />

    <!-- Success Message Section -->
    <section class="flex flex-col justify-center items-center">
      <img src="../assets/images/waiting.png" class="w-80" alt="Waiting" />
      <h1 class="text-2xl my-4 font-bold">Order successful!</h1>

      <div class="order-confirmation">
        <h4 class="sassy">Your order will be processed immediately</h4>
        <h4 class="sassy">Happy Waiting :)</h4>
        <p class="sassy">
          <em>"You just told your hunger to take a hike — professional move"</em>
        </p>
      </div>
    </section>

  </div>
</template>


<script>
import NavbarVue from '../components/Navbar.vue'

export default {
  name: 'OrderSuccess',
  components: {
    NavbarVue
  },
}
</script>

<style scoped>
.order-confirmation {
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
}
</style>
