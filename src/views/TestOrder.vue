<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{ backgroundImage: `url(${item.imageUrl})` }">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元 </div>
              <del class="h6" v-if="item.price"> 原價 {{ item.origin_price }} 元 </del>
              <div class="h5" v-if="item.price"> 現在只要 {{ item.price }} 元 </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元 </div>
              <del class="h6" v-if="product.price"> 原價 {{ product.origin_price }} 元 </del>
              <div class="h4" v-if="product.price"> 現在只要 {{ product.price }} 元 </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- 購物車 -->
    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th> 品名 </th>
            <th> 數量 </th>
            <th> 單價 </th>
          </thead>
          <tbody v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
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
        <!-- 訂單列表 -->
        <div class="my-5 row justify-content-center">
          <form class="col-md-12" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" name="email" id="useremail"
                v-validate="'required|email'"
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email" placeholder=" 請輸入 Email">
              <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first('email') }}
              </span>
            </div>
            <div class="form-group">
              <label for="username"> 收件人姓名 </label>
              <input type="text" class="form-control" name="name" id="username"
                :class="{'is-invalid': errors.has('name')}"
                v-model="form.user.name" v-validate="'required'" placeholder=" 輸入姓名 ">
              <span class="text-danger" v-if="errors.has('name')"> 姓名必須輸入 </span>
            </div>
            <div class="form-group">
              <label for="usertel"> 收件人電話 </label>
              <input type="tel" class="form-control" id="usertel" required
                v-model="form.user.tel" placeholder=" 請輸入電話 ">
            </div>
            <div class="form-group">
              <label for="useraddress"> 收件人地址 </label>
              <input type="address" class="form-control" name="address"
                :class="{'is-invalid': errors.has('address')}"
                id="useraddress" v-model="form.user.address" v-validate="'required'"
                placeholder=" 請輸入地址 ">
              <span class="text-danger" v-if="errors.has('address')"> 地址欄位不得留空 </span>
            </div>
            <div class="form-group">
              <label for="useraddress"> 留言 </label>
              <textarea name="" id="" class="form-control" cols="30" rows="10"
                v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger"> 送出訂單 </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
  name: 'TestOrder',
  data() {
    return {
      // products: [],
      // product: {},
      coupon_code: '',
      // cart: {},
      // status: {
      //   loadingItem: '',
      // },
      // isLoading: false,
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
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    getProduct(id) {
      this.$store.dispatch('getProduct', id);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
    removeCartItem(id) {
      this.$store.dispatch('removeCartItem', id);
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response);
        vm.$store.dispatch('updateLoading', false);
        vm.getCart();
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      // vm.$store.dispatch('updateLoading', true);
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            console.log('已建立訂單', response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.$store.dispatch('updateLoading', false);
            // vm.getCart();
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'product', 'cart', 'cart_lenght', 'cartRemove', 'status']),
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
