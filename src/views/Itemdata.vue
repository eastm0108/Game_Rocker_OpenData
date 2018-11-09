<template>
  <div class=" bg-dark">
    <loading :active.sync="isLoading"></loading>
    <CustomerNavbar/>
    <Alert></Alert>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style">
          <li class="breadcrumb-item font-weight-bold">
            <router-link to="/" class="text-white">
              首頁
            </router-link>
          </li>
          <li class="breadcrumb-item font-weight-bold active text-lakeblue"
          aria-current="page">
            <router-link to="/categories" class="text-white">
              商品
            </router-link>
          </li>
          <li class="breadcrumb-item font-weight-bold active text-lakeblue"
          aria-current="page">{{product.title}}</li>
        </ol>
      </nav>
      <main>
        <div class="row">
          <!-- 商品資訊 -->
          <div class="col-md-4">
            <div class="itemCard">
              <img class="itemImg" :src="product.imageUrl" :alt="product.title">
              <p class="h5 mt-3 text-warning font-weight-bold px-3 pb-2
              border-bottom border-sort">
                商品介紹
              </p>
              <p class="px-3 text-white">{{product.content}}</p>
              <p class="h5 mt-3 text-warning font-weight-bold px-3 pb-2
              border-bottom border-sort">
                運費方式
              </p>
              <p class="px-3 text-white">無</p>
            </div>
          </div>
          <!-- 選購方式 -->
          <div class="col-md-8 px-4">
            <div class="itemCard">
              <h1 class="text-lightTitle">{{product.title}}</h1>
              <p class="h6 mt-3 text-white-gray"
              v-if="product.origin_price !== '0'">
                原價 NT${{product.origin_price}}
              </p>
              <p class="h4 text-lakeblue"
              v-if="product.price !== '0'">
                特價 NT${{product.price}}
              </p>
              <select name="" class="form-control mt-3" v-model="productNum">
              <option value="" disabled>--- 請選擇數量 ---</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
              </select>
              <button type="button" class="mt-3 btn-block btn btn-primary"
              @click="addtoCart(product.id, productNum)">
                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                小計 NT$ {{ productNum * product.price }} 元 / 加到購物車
              </button>
              <p class="h5 mt-3 text-warning font-weight-bold pb-2
              border-bottom border-sort">
                注意事項
              </p>
              <p class="text-white">無</p>
            </div>
          </div>
        </div>
      </main>
    </div>
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
import CustomerNavbar from '@/components/CustomerNavbar.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    CustomerNavbar,
    Alert,
  },
  data() {
    return {
      product: {},
      productId: '',
      productNum: '1',
      isLoading: false,
      status: {
        loadingItem: '',
      },
      // 購物車用
      cart: {},
      cart_lenght: 0,
      carStatu: false,
      coupon_code: '',
      cartRemove: false,
    };
  },
  methods: {
    getOrder(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.product = response.data.product;
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
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
    addtoCart(id, qty) {
      if (qty === '') {
        this.$bus.$emit('messsage:push', '數量不正確！', 'danger');
        return;
      }
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
        this.$bus.$emit('messsage:push', '加入到購物車囉！', 'lakeblue');
      });
    },
    goPay() {
      $('#productModal').modal('hide');
      this.$router.push('/orders_pay');
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    console.log(this.productId);
    this.getOrder(this.productId);
    this.getCart();
  },
};
</script>
