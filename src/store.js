/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    product: {},
    status: {
      loadingItem: '',
    },
    // 購物車用
    cart: {
      carts: [],
    },
    cart_lenght: 0,
    carStatu: false,
    cartRemove: false,
  },
  actions: {
    // payload 載荷
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context) {
      // 取得全部
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log(response);
        context.commit('LOADING', false);
        context.commit('PRODUCTS', response.data.products);
      });
    },
    getProduct(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      context.commit('LOADINGITEM', id);
      axios.get(api).then((response) => {
        $('#productModal').modal('show');
        context.commit('PRODUCT', response.data.product);
        console.log(response);
        context.commit('LOADINGITEM', '');
      });
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((response) => {
        console.log(response);
        context.commit('CART', response.data.data);
      });
    },
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('CARTREMOVE', true);
      axios.delete(api).then((response) => {
        console.log(response);
        context.commit('CARTREMOVE', false);
        context.dispatch('getCart');
      });
    },
    addtoCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      context.commit('LOADINGITEM', id);
      axios.post(api, { data: cart }).then((response) => {
        console.log(response);
        context.commit('LOADINGITEM', '');
        context.dispatch('getCart');
        $('#productModal').modal('hide');
        new Vue().$bus.$emit('messsage:push', '加入到購物車囉！', 'lakeblue');
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    LOADINGITEM(state, payload) {
      state.status.loadingItem = payload;
    },
    CART(state, payload) {
      state.cart = payload;
      state.cart_lenght = (state.cart.carts).length;
    },
    CARTS(state, payload) {
      state.cart = payload;
    },
    CARTREMOVE(state, payload) {
      state.cartRemove = payload;
    },
  },
  getters: {
    isLoading(state) { return state.isLoading; },
    products(state) { return state.products; },
    product(state) { return state.product; },
    cart(state) { return state.cart; },
    cart_lenght(state) { return state.cart_lenght; },
    cartRemove(state) { return state.cartRemove; },
    status(state) { return state.status; },
  },
});
