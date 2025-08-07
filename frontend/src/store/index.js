import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bestProducts: [],
    products: [],
    product: null,
    basket: [],
    orders: [],
    allUsers: [],
    pendingOrders: [],
    userPendingOrders: [],
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    setBestProducts(state, data) { state.bestProducts = data },
    setProducts(state, data) { state.products = data },
    setProduct(state, data) { state.product = data },
    setBasket(state, data) { state.basket = data },
    setOrders(state, data) { state.orders = data },
    setUser(state, data) { state.user = data },
    logoutUser(state) { state.user = null },
    setAllUsers(state, data) { state.allUsers = data },
    setPendingOrders(state, data) { state.pendingOrders = data; },
    removeProduct(state, id) { state.products = state.products.filter(p => p.id !== id); },
    processOrder(state, orderId) {
      state.pendingOrders = state.pendingOrders.filter(order => order.id !== orderId);
      state.userPendingOrders = state.userPendingOrders?.filter(order => order.id !== orderId);
    },
    setUserPendingOrders(state, data) {
      state.userPendingOrders = data;
    }
  },
  actions: {
    // async getBestProducts({ commit }) {
    //   try {
    //     const response = await axios.post('http://localhost:4000/home', {
    //       transition: 'GET_BEST_PRODUCTS',
    //       // data : null,
    //     });
    //     const result = response.data;
    //     console.log('Best products success :', result.success);
    //     console.log('FE Best products:', result.bestProducts);

    //     if (result.success) {
    //       console.log('Best products fetched successfully:', result.bestProducts);
    //       commit('setBestProducts', result.bestProducts);
    //     }
    //   } catch (error) { console.error(error) }
    // },

   
    async getUserPendingOrders({ commit, state }) {

      //GET_USER_PENDING_ORDERS
      try {
        const user_id = state.user?.id;
        console.log('user id is ', user_id);
        if (!user_id) {
          console.error('User ID not found in store.');
          return;
        }
        const response = await axios.post('http://localhost:4000/userPendingOrder', {
          transition: 'GET_USER_PENDING_ORDERS',
          data: user_id,
        });

        const result = response.data;
        console.log('user Pending Orders fetched successfully:', result.success);
        console.log('FE user pending orders:', result.PendingOrder);
        if (result.success) {
          console.log('nUser Pending orders fetched successfully:', result.PendingOrder);
          commit('setUserPendingOrders',result.PendingOrder);
        }
      } catch (error) { console.error(error) }
    },

    async getProducts({ commit }) {
      try {
        const response = await axios.post('http://localhost:4000/foods', {
          transition: 'GET_PRODUCTS',
          // data: null,
        });

        const result = response.data;
        console.log('Products fetched successfully:', result.success);
        console.log('FE Products:', result.Product);
        if (result.success) {
          console.log('nProducts fetched successfully:', result.Product);
          commit('setProducts', result.Product);
        }
      } catch (error) { console.error(error) }
    },
    async getProductById({ commit, state }, id) {
      try {
        const response = await axios.post('http://localhost:4000/product', {
          transition: 'GET_PRODUCT',
          data: { id }
        });

        const result = response.data;
        console.log('Product fetched:', result);
        console.log('Product success:', result.success);
        console.log('FE Product:', result.Product);

        if (result.success) {
          console.log('Product fetched successfully:', result.Product);
          commit('setProduct', result.Product);

          if (state.user && state.user.email && state.user.email.trim().toLowerCase().endsWith('@admin.com')) {
            router.push(`/updateProduct/${id}`);
          } else {
            router.push(`/foods/${id}`);
          }

        }
      } catch (error) { console.error(error) }
    },

    async getBasket({ commit, state }) {
      if (!state.user) return
      try {
        const basketRes = await axios.post('http://localhost:4000/getBasket', {
          transition: 'GET_BASKET',
          data: { id: state.user.id }
        });
        console.log('Basket fetched:', basketRes.data);
        console.log('Basket success:', basketRes.data.success);
        console.log('FE Basket:', basketRes.data.basket);

        const { basket } = basketRes.data;
        const basketItems = basket;

        const detailedItems = await Promise.all(
          basketItems.map(async item => {
            const prodRes = await axios.post(
              'http://localhost:4000/showBasket',
              {
                transition: 'SHOW_BASKET',
                data: { id: item.product_id }
              }
            );
            return { ...item, product: prodRes.data.product };
          })
        );

        commit('setBasket', detailedItems)
      } catch (error) { console.error(error) }
    },
    async addToBasket({ dispatch }, item) {
      try {
        const response = await axios.post('http://localhost:4000/basket', {
          transition: 'ORDER',
          data: {
            user_id: item.user_id,
            product_id: item.product_id,
            total_booking: item.total_booking, // <-- total_booking (snake_case)
            description: item.description
          }
        });

        const result = response.data;
        console.log('Add to basket result:', result.success);
        console.log('FE Basket:', result.basket);
        if (result.success) {
          console.log('Item added to basket successfully:', result.basket);
          Vue.toasted.success('Item added to basket', { message: 'Item added to basket', duration: 1000 });
          dispatch('getBasket');
          router.push('/basket')
        } else {
          Vue.toasted.error('Failed to add item to basket or invalid quantity ', { message: 'Failed to add item to basket', duration: 1000 });
        }

      } catch (error) { console.error(error) }
    },
    async removeFromBasket({ dispatch }, basketId) {
      try {
        const response = await axios.post('http://localhost:4000/deleteBasket', {
          transition: 'DELETE_BASKET',
          data: { id: basketId }
        });
        const result = response.data;
        console.log('Remove from basket result:', result.success);
        if (result.success) {
          console.log('Item removed from basket successfully');
          Vue.toasted.success('Item removed from basket', { message: 'Item removed from basket', duration: 1000 });
          dispatch('getBasket');
        }
      } catch (error) { console.error(error) }
    },

    async checkout({ dispatch, state }, { table_no }) {
      if (!state.user) return
      const items = state.basket.map(i => ({
        product_id: i.product_id,
        total_booking: i.total_booking,
        description: i.description
      }))
      try {

        const response = await axios.post('http://localhost:4000/order', {
          transition: 'SET_ORDER',
          data: { id: state.user.id, table_no, items }
        });
        const result = response.data;
        console.log('Checkout result:', result);
        console.log('Checkout success:', result.success);

        if (result.success) {
          console.log('Order placed successfully:', result.order);
          Vue.toasted.success('Order placed successfully', { message: 'Order placed successfully', duration: 1000 });
          dispatch('clearBasket')
          router.push('/order-success')
        }

      } catch (error) { Vue.toasted.error(error.response?.data?.message || 'Atleast one item required', { message: 'item not added ', duration: 1000 }) }
    },
    //`http://localhost:3000/baskets/${i.id}`
    async clearBasket({ dispatch, state }) {
      const response = await Promise.all(state.basket.map(i => axios.post('http://localhost:4000/deleteBasket', {
        transition: 'DELETE_BASKET',
        data: { id: i.id }
      })));
      const results = response.map(res => res.data);
      console.log('Clear basket results:', results);
      const success = results.every(res => res.success);
      if (success) {
        console.log('Basket cleared successfully');
        Vue.toasted.success('Basket cleared successfully', { message: 'Basket cleared successfully', duration: 1000 });
        dispatch('getBasket')
      } else {
        console.error('Failed to clear basket');
        Vue.toasted.error('Failed to clear basket', { message: 'Failed to clear basket', duration: 1000 });
      }
    },
    async getOrders({ commit, state }) {
      if (!state.user) return
      try {
        const { data } = await axios.get(`http://localhost:3000/orders?user_id=${state.user.id}`)
        commit('setOrders', data)
      } catch (error) { console.error(error) }
    },

    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:4000/login', {
          transition: 'LOGIN',
          data: {
            email,
            password
          }
        });

        const result = await response.data;
        console.log('Login result:', result.success);
        console.log('FE User:', result.user);

        if (result.success) {
          console.log('Login successful:', result.user);
          localStorage.setItem('user', JSON.stringify(result.user));
          Vue.toasted.success('Login successful', { message: 'Login successful', duration: 1000 });
          // commit('setUser', result.user);
          commit('setUser', result.user);
          if (email.trim().toLowerCase().endsWith('@admin.com')) {
            await router.push('/adminDashboard');
          } else {
            await router.push('/home');
          }
        }
        else {
          Vue.toasted.error('Invalid Credentials', { message: 'Invalid Credentials', duration: 1000 });
          //console.error('Login failed:', result.error);

        }
      } catch (error) {
        Vue.toasted.error(error.response?.data?.message || 'Login failed', { message: 'Login fauled ', duration: 1000 })
      }
    },

    async signup({ commit }, { name, email, password }) {
      try {
        const response = await axios.post('http://localhost:4000/signup', {
          transition: 'SIGNUP',
          data: {
            name,
            email,
            password
          }
        });
        const result = await response.data;
        console.log('Signup result:', result.success);

        if (result.success) {
          console.log('Signup successful:', result.user);
          commit('setUser', result.user);
          localStorage.setItem('user', JSON.stringify(result.user));
          await router.push('/')
          Vue.toasted.success('Signup successful', { message: 'Signup successful', duration: 1000 });
        }
        else {
          Vue.toasted.error('Email Already registered or fields are empty', { message: 'Email Already registered or fields are empty', duration: 1000 });
        }
      } catch (error) {
        Vue.toasted.error(error.response?.data?.message || 'Signup failed', { message: 'SignUP fauled ', duration: 1000 })
      }
    },

    logout({ commit }) {
      localStorage.removeItem('user')
      commit('setUser', null)
      commit('setBasket', [])
      commit('setOrders', [])

      router.push('/')
    },
    //============ADMIN SIDE================

    async getAllUsers({ commit }) {

      try {
        const response = await axios.post('http://localhost:4000/getUsers', {
          transition: 'GET_USERS',
          // data: null,
        });

        const result = response.data;
        console.log('Users fetched successfully:', result.success);
        console.log('FE Users:', result.users);
        if (result.success) {
          console.log('nUsers fetched successfully:', result.users);
          commit('setAllUsers', result.users);
        }
      } catch (error) { console.error(error) }

    },

    // 🆕 CREATE a new product (admin)
    async createProduct({ dispatch }, payload) {

      try {
        const response = await axios.post('http://localhost:4000/createProduct', {
          transition: 'ADD_PRODUCT',
          data: {
            code: payload.code,
            name: payload.name,
            price: payload.price,
            is_ready: payload.is_ready,
            gambar: payload.gambar
          }
        });
        const result = await response.data;
        console.log('New Product result:', result.success);

        if (result.success) {
          console.log('New Product created successfully:', result.product);
          Vue.toasted.success('New Product created successfully', { message: 'New Product created successfully', duration: 1000 });
          dispatch('getProducts');
        }
        else {
          Vue.toasted.error('Failed to create product or fields are empty', { message: 'Failed to create product or fields are empty', duration: 1000 });
        }
      } catch (error) {
        Vue.toasted.error(error.response?.data?.message || 'product failed', { message: 'product fauled ', duration: 1000 })
      }

    },

    // ✏️ UPDATE an existing product (admin)
    async updateProduct({ dispatch }, { id, code, name, price, is_ready, gambar }) {
      // try {
      //   await axios.put(`http://localhost:3000/products/${id}`, { code, name, price, is_ready, gambar });
      //   dispatch('getProducts');
      //   //router.push(`/updateProduct/${id}`);
      // } catch (error) {
      //   console.error(error);
      // }
      console.log('Update Product:', { id, code, name, price, is_ready, gambar });

      try {
        const response = await axios.post('http://localhost:4000/updateProduct', {
          transition: 'UPDATE_PRODUCT',
          data: {
            id: id,
            code: code,
            name: name,
            price: price,
            is_ready: is_ready,
            gambar: gambar
          }
        });
        const result = await response.data;
        console.log('updated Product result:', result.success);

        if (result.success) {
          console.log('Product updated successfully:', result.product);
          Vue.toasted.success('Product updated successfully', { message: 'Product updated successfully', duration: 1000 });
          dispatch('getProducts');
        }
        else {
          Vue.toasted.error('Failed to update product or fields are empty', { message: 'Failed to update product or fields are empty', duration: 1000 });
        }
      } catch (error) {
        Vue.toasted.error(error.response?.data?.message || 'product update failed', { message: 'product update fauled ', duration: 1000 })
      }

    },

    // ❌ DELETE a product (admin)
    async deleteProduct({ dispatch, commit }, id) {
      try {
        const response = await axios.post('http://localhost:4000/deleteProduct', {
          transition: 'DELETE_PRODUCT',
          data: { id: id }
        });
        const result = response.data;
        console.log('Delete product result:', result.success);
        if (result.success) {
          console.log('product Deleted successfully');
          Vue.toasted.success('product deleted successfuly Successfully!', { message: 'product Deleted Successfully!', duration: 1000 });
          commit('removeProduct', id);
          dispatch('getProducts');
        }
        else {
          Vue.toasted.error('this product is in Pending Order so cant be Deleted!', { message: 'this product is in Pending Order so cant be Deleted', duration: 1000 });
        }
      } catch (error) { console.error(error) }

    },

    async getPendingOrders({ commit }) {

      try {
        const response = await axios.post('http://localhost:4000/pendingOrder', {
          transition: 'GET_PENDING_ORDERS',
          // data: null,
        });

        const result = response.data;
        console.log('Pending Orders fetched successfully:', result.success);
        console.log('FE pending orders:', result.PendingOrder);
        if (result.success) {
          console.log('nPending orders fetched successfully:', result.PendingOrder);
          commit('setPendingOrders', result.PendingOrder);
        }
      } catch (error) { console.error(error) }

    },
    async processOrder({ dispatch, commit }, orderId) {

      try {
        const response = await axios.post('http://localhost:4000/processOrder', {
          transition: 'PROCESS_ORDER',
          data: { id: orderId }
        });
        const result = response.data;
        console.log('Order processed result:', result.success);
        if (result.success) {
          console.log('Order Processed successfully');
          Vue.toasted.success('Order Processed Successfully!', { message: 'Order Processed Successfully!', duration: 1000 });
          commit('processOrder', orderId);
          dispatch('getPendingOrders')
        }
      } catch (error) { console.error(error) }

    },


  },
  getters: {
    isLoggedIn: state => !!state.user,
    basketCount: state => state.basket.length,
    allUsers: state => state.allUsers,
    pendingOrders: state => state.pendingOrders,
    userPendingOrders: state => state.userPendingOrders

  }
})
