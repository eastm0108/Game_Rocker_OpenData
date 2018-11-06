<template>
  <div class=" bg-dark">
    <loading :active.sync="isLoading"></loading>
    <CustomerNavbar/>
    <Alert></Alert>
    <CustomerCarousel/>
    <div class="container">
      <div class="">
        <main role="main" class="container">
          <div class="text-cebter row">
            <div class="col-md-3 text-center mb-2">
              <router-link to="/categories" class="pulse-button">
                超強大作
              </router-link>
            </div>
            <div class="col-md-3 text-center mb-2">
              <router-link to="/categories" class="pulse-button">
                經典商品
              </router-link>
            </div>
            <div class="col-md-3 text-center mb-2">
              <router-link to="/categories" class="pulse-button">
                超值組合
              </router-link>
            </div>
            <div class="col-md-3 text-center mb-2">
              <router-link to="/categories" class="pulse-button">
                熱門主機
              </router-link>
            </div>
          </div>
          <p class="mt-4 line-1 anim-typewriter text-lakeblue">男孩的遊戲世界!</p>
          <!-- 首頁卡片 -->
          <div class="row">
            <div class="col-sm-6 col-xs-6 mr-0 mb-3" v-for="item in products" :key="item.id">
            <div class="list mb-2">
              <div class="list-header">
                  <a href="#" class="list-header-image index-card-a">
                    <img :src="item.imageUrl">
                  </a>
              </div>
              <div class="list-content">
                  <h2><a href="#" class="text-dark index-card-a">{{item.title}}</a></h2>
                  <span class="list-meta mb-1">
                    <div class="list-meta-item index-card-a text-danger h6">
                      <i class="fa fa-star"></i>
                      {{item.category}}
                    </div>
                  </span>
                  <p class="font-weight-bold h6 mb-2">{{item.content}}</p>
                  <div class="d-flex align-items-center">
                    <del class="h6 font-italic text-secondary"
                    v-if="item.price"> 原價 {{ item.origin_price }} 元 </del>
                    <div class="h5 ml-auto text-success"
                    v-if="item.price"> NT$ {{ item.price }} 元 </div>
                  </div>
                  <div class="d-flex justify-content-around">
                    <button type="button" v-if=" item.num !== 0 "
                    class="btn btn-outline-secondary btn-sm"
                    @click="ProductData(item.id)">
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                      查看更多
                    </button>
                    <button type="button" v-if=" item.num !== 0 "
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addtoCart(item.id)">
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                      加到購物車
                    </button>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <hr class="stars">
    <footer class="container">
      <div class="row">
        <div class="col-md-4 mb-2">
          <img src="../../assets/navbar_img.png" alt="Logo">
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
        </div>
      </div>
    </footer>
    <!-- 購物車 -->
    <div class="car" @click="openCar">
      <p>{{ cart_lenght }}</p>
    </div>
    <!-- 購物車清單 -->
    <div class="modal fade pr-0" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title mb-0 font-weight-bold">購物籃</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <th></th>
                <th> 品名 </th>
                <th> 數量 </th>
                <th> 單價 </th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                  <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <i class="fas fa-spinner fa-spin" v-if="cartRemove"></i>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right"> 總計 </td>
                  <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-right text-success"> 折扣價 </td>
                  <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- 優惠劵輸入處 -->
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder=" 請輸入優惠碼 ">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button"
              @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="goPay">
              前往結帳
            </button>
            <!-- 購物車清單 -->
          </div>
        </div>
      </div>
    </div>
    <!-- 購物車清單結束 -->
  </div>
</template>

<script>
import $ from 'jquery';
import carousel from 'vue-owl-carousel';
import CustomerNavbar from '../CustomerNavbar';
import Alert from '../AlertMessage';
import CustomerCarousel from '../CustomerCarousel';

export default {
  components: {
    CustomerNavbar,
    Alert,
    CustomerCarousel, // 廣告
    carousel,
  },
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      // 購物車用
      cart: {},
      cart_lenght: 0,
      carStatu: false,
      coupon_code: '',
      cartRemove: false,
    };
  },
  methods: {
    getProducts() {
      // 取得全部
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = '';
        $('#productModal').modal('show');
      });
    },
    // 購物車用
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.cart = response.data.data;
        vm.cart_lenght = (vm.cart.carts).length;
      });
    },
    openCar() {
      $('#productModal').modal('show');
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then((response) => {
        console.log(response);
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
        this.$bus.$emit('messsage:push', '加入到購物車囉！', 'lakeblue');
      });
    },
    removeCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.cartRemove = true;
      this.$http.delete(api).then((response) => {
        console.log(response);
        vm.cartRemove = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    ProductData(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      // const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response);
        this.$router.push(`/itemdata/${id}`);
      });
    },
    goPay() {
      $('#productModal').modal('hide');
      this.$router.push('/orders_pay');
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
