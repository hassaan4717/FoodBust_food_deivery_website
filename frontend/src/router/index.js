import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/foods',
    name: 'Foods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Foods.vue'),
   meta: { requiresAuth: true }
  },
  {
    path: '/foods/:id',
    name: 'Food Detail',
    component: () => import('../views/FoodDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../views/basket.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/order-success',
    name: 'order',
    component: () => import('../views/OrderSuccess.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/adminDashboard',
    name: 'adminDashboard',
    component: () => import('../views/adminDashboard.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/userPendingOrder',
    name: 'userPendingOrder',
    component: () => import('../views/userPendingOrder.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/food_items',
    name: 'seeProducts',
    component: () => import('../views/seeProducts.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/updateProduct/:id',
    name: 'updateProduct',
    component: () => import('../views/updateProduct.vue'),
    meta: { requiresAuth: true }
  },
   {
    path: '/users',
    name: 'seeUsers',
    component: () => import('../views/seeUsers.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/addProduct',
    name: 'addProduct',
    component: () => import('../views/addProduct.vue'),
    meta: { requiresAuth: true }
  },
   {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/signup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'adminLogin',
    component: () => import('../views/adminLogin.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  console.log('Navigating to:', to.path);
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    console.log('Not authenticated! Redirecting to login.');
    next('/');
  } else {
    next();
  }
});

export default router
