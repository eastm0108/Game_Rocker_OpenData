<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary"
      @click="openModel(true)">建立優惠券</button>
    </div>
    <table class="table mt-4 tableStyle">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="120">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.percent + ' %' }}
          </td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <button class="btn btn-outline-primary btn-sm"
              @click="openModel(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
              @click="openDelModel(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <!-- 元件化 -->
    <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>
<!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">名稱</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入名稱">
                </div>
                <div class="form-group">
                  <label for="title">優惠碼</label>
                  <input type="number" class="form-control" id="title"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼">
                </div>
                <div class="form-group">
                  <label for="title">到期日</label>
                  <input type="date" class="form-control" id="title"
                    v-model="tempCoupon.due_date"
                    placeholder="請輸入日期">
                </div>
                <div class="form-group">
                  <label for="title">折扣百分比</label>
                  <input type="number" class="form-control" id="title"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入折扣百分比">
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatecoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠劵</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠劵(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click="deleteCoupon">確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      PreDeleteCoupon: {},
      status: {
        fileUploading: false,
      },
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          vm.isLoading = false;
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        } else {
          vm.isLoading = false;
          /* eslint-disable */
          alert('請登出，重新登入系統');
          /* eslint-enable */
        }
      });
    },
    openModel(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updatecoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $('#couponModal').modal('hide');
          vm.getCoupons();
        } else {
          $('#couponModal').modal('hide');
          vm.getCoupons();
          console.log('新增失敗');
        }
        // vm.coupons = response.data.coupons;
      });
    },
    openDelModel(item) {
      $('#delCouponModal').modal('show');
      this.PreDeleteCoupon = Object.assign({}, item);
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.PreDeleteCoupon.id}`;
      console.log(this.PreDeleteCoupon);
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
          console.log('已刪除產品');
        } else {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
          console.log('找不到產品');
        }
        vm.PreDeleteCoupon = {};
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        vm.status.fileUploading = false;
        if (response.data.success) {
          // vm.tempCoupon.imageUrl = response.data.imageUrl;
          // console.log(vm.tempCoupon);
          vm.$set(vm.tempCoupon, 'imageUrl', response.data.imageUrl);
        } else {
          this.$bus.$emit('messsage:push', response.data.message, 'danger');
        }
      });
      // console.log(vm);
      // console.log(uploadedFile);
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
