<template>
  <div class=" bg-dark">
    <!-- <loading :active.sync="isLoading"></loading> -->
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
    <div class="container d-flex justify-content-center align-items-center mb-3">
      <img src="https://upload.cc/i1/2018/11/04/Inh3gr.png" alt="購物籃" style="width: 60px;height: 60px;">
      <h1 class="d-inline-block mb-0 text-white pl-3">購物籃</h1>
    </div>
    <main class="container">
      <table class="table bg-white text-dark payTable">
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
            <td class="align-middle text-right">{{ item.final_total |currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right"> 總計 </td>
            <td class="text-right">{{ cart.total |currency}}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success"> 折扣價 </td>
            <td class="text-right text-success">{{ cart.final_total |currency}}</td>
          </tr>
        </tfoot>
      </table>
      <!-- 優惠劵輸入處 -->
      <div class="input-group mb-3 input-group-sm payCoupon">
        <input type="text" class="form-control" v-model="coupon_code"
        placeholder=" 請輸入優惠碼，試試看 111 ?">
        <div class="input-group-append">
          <button class="btn btn-danger" type="button"
          @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center mt-3">
        <img src="https://upload.cc/i1/2018/11/06/7XRo1P.png" alt="電玩搖桿Logo" style="width: 60px;height: 60px;">
        <h2 class="d-inline-block mb-0 text-white h1 pl-4">訂單資訊</h2>
      </div>
      <!-- 訂單資訊 -->
      <div class="my-3 row justify-content-center">
        <form class="col-md-12" @submit.prevent="createOrder">
          <div class="form-group">
            <label class="text-lightTitle font-weight-bold" for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
              v-validate="'required|email'"
              :class="{'is-invalid': errors.has('email')}"
              v-model="form.user.email" placeholder=" 請輸入 Email">
            <span class="text-danger font-weight-bold" v-if="errors.has('email')">
              {{ errors.first('email') }}
            </span>
          </div>
          <div class="form-group">
            <label class="text-lightTitle font-weight-bold" for="username"> 收件人姓名 </label>
            <input type="text" class="form-control" name="name" id="username"
              :class="{'is-invalid': errors.has('name')}"
              v-model="form.user.name" v-validate="'required'" placeholder=" 輸入姓名 ">
            <span class="text-danger font-weight-bold" v-if="errors.has('name')"> 姓名必須輸入 </span>
          </div>
          <div class="form-group">
            <label class="text-lightTitle font-weight-bold" for="usertel"> 收件人電話 </label>
            <input type="tel" class="form-control" id="usertel" name="tel"
              v-model="form.user.tel" v-validate="'required'" placeholder=" 請輸入電話號碼 ">
            <span class="text-danger font-weight-bold" v-if="errors.has('tel')"> 電話號碼不得留空 </span>
          </div>
          <div class="form-group">
            <label class="text-lightTitle font-weight-bold" for="useraddress"> 收件人地址 </label>
            <input type="address" class="form-control" name="address"
              :class="{'is-invalid': errors.has('address')}"
              id="useraddress" v-model="form.user.address" v-validate="'required'"
              placeholder=" 請輸入地址 ">
            <span class="text-danger font-weight-bold"
            v-if="errors.has('address')"> 地址欄位不得留空 </span>
          </div>
          <div class="form-group">
            <label class="text-lightTitle font-weight-bold" for="usertextarea"> 留言 </label>
            <textarea name="" id="usertextarea" class="form-control" cols="30" rows="10"
              v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-warning font-weight-bold btn-block paySubmit"> 送出訂單 </button>
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
      // 購物車用
      status: {
        loadingItem: '',
      },
      isLoading: false,
      cart: {},
      cart_lenght: 0,
      carStatu: false,
      coupon_code: '',
      cartRemove: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
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
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      vm.cartRemove = true;
      this.$http.delete(api).then((response) => {
        console.log(response);
        vm.isLoading = false;
        vm.cartRemove = false;
        vm.getCart();
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            console.log('已建立訂單', response);
            if (response.data.success) {
              vm.$router.push(`/pay_check/${response.data.orderId}`);
            }
            vm.isLoading = false;
            // vm.getCart();
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
    goBack(page) {
      this.$router.push(`/${page}`);
    },
  },
  created() {
    this.getCart();
  },
};
</script>
