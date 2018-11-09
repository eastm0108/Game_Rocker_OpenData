<template>
  <div class=" bg-dark">
    <loading :active.sync="isLoading"></loading>
    <CustomerNavbar/>
    <Alert></Alert>
    <CustomerCarousel/>
    <main role="main" class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style">
          <li class="breadcrumb-item font-weight-bold">
            <router-link to="/" class="text-white">
              首頁
            </router-link>
          </li>
          <li class="breadcrumb-item font-weight-bold active text-lakeblue"
          aria-current="page">商品</li>
        </ol>
      </nav>
      <!-- 麵包屑結束 -->
      <div class="row">
        <div class="col-md-2">
          <div class="row">
            <div class="col-sm-12 col-md-12 text-center mb-2 sortList">
              <div class="sortBtn font-weight-bold"
              :class="{'sortBtn_All': sortStatus=='all'}" @click="sortStatus='all'">
                全部商品
              </div>
            </div>
            <div class="col-3 col-md-12 text-center mb-2 sortList">
              <div class="sortBtn font-weight-bold"
              :class="{'sortBtn_Super': sortStatus=='超強大作'}" @click="sortStatus='超強大作'">
                超強大作
              </div>
            </div>
            <div class="col-3 col-md-12 text-center mb-2 sortList">
              <div class="sortBtn font-weight-bold"
              :class="{'sortBtn_Classic': sortStatus=='經典商品'}" @click="sortStatus='經典商品'">
                經典商品
              </div>
            </div>
            <div class="col-3 col-md-12 text-center mb-2 sortList">
              <div class="sortBtn font-weight-bold"
              :class="{'sortBtn_Value': sortStatus=='超值組合'}" @click="sortStatus='超值組合'">
                超值組合
              </div>
            </div>
            <div class="col-3 col-md-12 text-center mb-2 sortList">
              <div class="sortBtn font-weight-bold"
              :class="{'sortBtn_Host': sortStatus=='熱門主機'}" @click="sortStatus='熱門主機'">
                熱門主機
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <!-- 卡片 -->
            <div class="col-md-4 col-12 example-1 carItem mb-3"
            v-for="item in filterArray" :key="item.id">
              <div class="wrapper"
              :style="`background: url(${item.imageUrl}) center / cover no-repeat;`">
                <div class="date">
                  <span class="day">{{item.category}}</span>
                </div>
                <div class="data">
                  <div class="content">
                    <h1 class="title" @click="ProductData(item.id)">
                      {{item.title}}
                    </h1>
                    <p class="text">
                      {{item.content}}
                    </p>
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                    @click="ProductData(item.id)">
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                    v-if=" item.num !== 0 " @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"></i>
                        加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    <!-- 購物車 -->
    <div class="car" @click="openCar">
      <p>{{ cart_lenght }}</p>
    </div>
    <!-- 測試 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
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
                <tr v-if="cart.carts" v-for="item in cart.carts" :key="item.id">
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
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder=" 請輸入優惠碼 ">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="goPay">
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 測試結束 -->
  </div>
</template>

<script>
import $ from 'jquery';
import carousel from 'vue-owl-carousel';
import CustomerNavbar from '@/components/CustomerNavbar.vue';
import Alert from '@/components/AlertMessage.vue';
import CustomerCarousel from '@/components/CustomerCarousel.vue';

export default {
  components: {
    CustomerNavbar,
    Alert,
    CustomerCarousel,
    carousel,
  },
  data() {
    return {
      // 產品分類
      sortStatus: 'all',
      // 產品
      products: [],
      isLoading: false,
      // 購物車用
      status: {
        loadingItem: '',
      },
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
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
    // 購物車用
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.cart = response.data.data;
        vm.cart_lenght = (vm.cart.carts).length;
      });
    },
    openCar() {
      $('#productModal').modal('show');
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.cartRemove = true;
      this.$http.delete(api).then((response) => {
        console.log(response);
        vm.cartRemove = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
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
  computed: {
    filterArray() {
      const vm = this;
      // const newArray = [];
      switch (vm.sortStatus) {
        case 'all':
          return vm.products;
        case '超強大作':
          return vm.products.filter(item => item.category === '超強大作');
        case '經典商品':
          return vm.products.filter(item => item.category === '經典商品');
        case '超值組合':
          return vm.products.filter(item => item.category === '超值組合');
        case '熱門主機':
          return vm.products.filter(item => item.category === '熱門主機');
        default:
          break;
      }
      return 1;
    },
  },
  created() {
    this.getCart();
    this.getProducts();
  },
};

</script>
