<template>
  <div class=" bg-dark">
    <loading :active.sync="isLoading"></loading>
    <CustomerNavbar/>
    <Alert></Alert>
    <div class="container">
      <div class="col-md-12">
        <div class="row">
          <div class="col-sm-12 col-md-12 text-center mb-2 sortList">
            <div class="sortBtn font-weight-bold" @click="goBack('')">
              首頁
            </div>
          </div>
          <div class="col-3 col-md-3 text-center mb-2 sortList">
            <div class="sortBtn font-weight-bold" @click="goBack('categories')">
              超強大作
            </div>
          </div>
          <div class="col-3 col-md-3 text-center mb-2 sortList">
            <div class="sortBtn font-weight-bold" @click="goBack('categories')">
              經典商品
            </div>
          </div>
          <div class="col-3 col-md-3 text-center mb-2 sortList">
            <div class="sortBtn font-weight-bold" @click="goBack('categories')">
              超值組合
            </div>
          </div>
          <div class="col-3 col-md-3 text-center mb-2 sortList">
            <div class="sortBtn font-weight-bold" @click="goBack('categories')">
              熱門主機
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="container pb-4">
      <h1 class="text-center text-white">確認訂單</h1>
      <p class="text-center text-lightTitle h1 font-weight-bold"
      v-if="order.is_paid"> 感謝你的瀏覽體驗 </p>
      <p class="text-center text-lightTitle h1 font-weight-bold"
      v-if="order.is_paid"> 上方按鈕可以繼續逛逛</p>
      <div class="my-5 row justify-content-center">
        <form class="col-md-6 bg-white pb-2 payCheck" @submit.prevent="payOrder">
          <table class="table">
            <thead>
              <th> 品名 </th>
              <th> 數量 </th>
              <th> 單價 </th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total |currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right"> 總計 </td>
                <td class="text-right text-danger font-weight-bold">{{ order.total |currency}}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table">
            <tbody>
              <tr>
                <th class="font-weight-bold payInfoTh" width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold payInfoTh"> 姓名 </th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold payInfoTh"> 收件人電話 </th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold payInfoTh"> 收件人地址 </th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold payInfoTh"> 付款狀態 </th>
                <td>
                  <span v-if="!order.is_paid"> 尚未付款 </span>
                  <span v-else class="text-success"> 付款完成 </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger"> 確認付款去 </button>
          </div>
        </form>
      </div>
    </main>
    <hr class="stars">
    <footer class="container">
      <div class="row">
        <div class="col-md-4 mb-2">
          <img src="@/assets/navbar_img.png" alt="Logo">
        </div>
        <div class="col-md-4">
          <!-- <p class="text-white font-weight-bold h4">關於我們</p> -->
          <p class="text-white-gray font-weight-bold mb-0">營業時間：00：00－24：00</p>
          <p class="text-white-gray font-weight-bold mb-0">公司電話：09 - 12345678</p>
          <p class="text-white-gray font-weight-bold mb-0">公司店址：台灣 桃園市</p>
        </div>
        <div class="col-md-4 mb-3">
          <p class="text-white-gray font-weight-bold mb-0">作者：EastM</p>
          <P class="text-white-gray font-weight-bold mb-0">練習作品，無商業用途</P>
          <P class="text-white-gray font-weight-bold mb-0">圖片來源： https://www.google.com/</P>
          <p></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import CustomerNavbar from '@/components/CustomerNavbar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    CustomerNavbar,
    Alert,
  },
  data() {
    return {
      // isLoading: false,
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        // console.log(response);
        vm.$store.dispatch('updateLoading', false);
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api).then((response) => {
        // console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    goBack(page) {
      this.$router.push(`/${page}`);
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    // console.log(this.orderId);
  },
};
</script>
