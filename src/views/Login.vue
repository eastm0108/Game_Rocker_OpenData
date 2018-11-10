<template>
  <div class="d-flex justify-content-center align-items-center box bg-dark">
    <loading :active.sync="isLoading"></loading>
    <form class="form-signin" @submit.prevent="signin">
      <img :src="avatar" alt="Logo" class="mb-3 img-fluid boxImg">
      <p class="h4 text-center font-weight-bold text-danger"
      v-if="message">密碼錯誤</p>
      <label for="inputEmail" class="sr-only">Email address|電子信箱</label>
      <input type="email" id="inputEmail" class="form-control mb-2"
      placeholder="電子信箱" v-model="user.username" required autofocus>
      <label for="inputPassword" class="sr-only">Password|密碼</label>
      <input type="password" id="inputPassword" class="form-control"
      placeholder="密碼" v-model="user.password" required>
      <button class=" mt-4 btn btn-warning btn-block font-weight-bold"
      type="submit">登入</button>
      <router-link to="/"
      class="mt-2 btn btn-warning btn-block font-weight-bold">
        返回
      </router-link>
    </form>
  </div>
</template>

<script>
import avatar from '@/assets/navbar_img.png';

export default {
  name: 'HelloWorld',
  data() {
    return {
      avatar,
      // isLoading: false,
      user: {
        username: '',
        password: '',
      },
      message: false,
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.message = false;
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.$router.push('/admin/products');
        } else {
          vm.$store.dispatch('updateLoading', false);
          vm.message = true;
        }
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
