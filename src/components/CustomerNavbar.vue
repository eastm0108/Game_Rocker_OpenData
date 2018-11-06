<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark container px-0">
      <router-link to="/" class="navbar-brand navbar-logo">
        <img src="../assets/navbar_img.png" alt="Logo">
      </router-link>
      <button class="navbar-toggler mr-1 mt-3"
      type="button" data-toggle="collapse"
      data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation"
      :class="{'active-burger-bar':togglerBar}"
      @click="togglerBurgerBar">
        <div class="burger-bar"></div>
        <div class="burger-bar"></div>
        <div class="burger-bar"></div>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold" href="#"
          @click.prevent="login">管理者登入
            <span class="sr-only">(current)</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  name: 'Navbar',
  data() {
    return {
      togglerBar: false,
      cart: {},
      cart_lenght: 0,
    };
  },
  methods: {
    login() {
      const vm = this;
      vm.$router.push('/login');
    },
    togglerBurgerBar() {
      const vm = this;
      vm.togglerBar = !vm.togglerBar;
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.cart = response.data.data;
        vm.cart_lenght = (vm.cart.carts).length;
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
