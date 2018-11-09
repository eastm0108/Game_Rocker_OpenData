<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark container-fluid px-0">
      <div class="navbar-brand navbar-logo">
        <img src="@/assets/navbar_img.png" alt="Logo">
      </div>
      <button class="navbar-toggler ml-auto mt-3 mr-1"
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
          <router-link to="/admin/products"
          class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold">
            <i class="fas fa-sitemap"></i> 產品管理
            <span class="sr-only">(product)</span>
          </router-link>
          <router-link to="/admin/orders"
          class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold">
            <i class="fas fa-clipboard-list"></i> 訂單管理
            <span class="sr-only">(orders)</span>
          </router-link>
          <router-link to="/admin/coupons"
          class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold">
            <i class="fas fa-ticket-alt"></i> 優惠券
            <span class="sr-only">(coupons)</span>
          </router-link>
          <router-link to="/admin/test_order"
          class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold">
            <i class="fas fa-shopping-cart"></i> 模擬訂單
            <span class="sr-only">(Simulated order)</span>
          </router-link>
          <a class="nav-item nav-link text-white pt-4 pb-2 h6 ml-3 font-weight-bold" href="#"
          @click.prevent="signout">管理者登出
            <span class="sr-only">(Manager logout)</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      togglerBar: false,
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      /* eslint-disable no-console */
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/login');
        }
        /* eslint-enable no-console */
      });
    },
    togglerBurgerBar() {
      const vm = this;
      vm.togglerBar = !vm.togglerBar;
    },
  },
};
</script>
