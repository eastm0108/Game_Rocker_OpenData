import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import VeeValidate, { Validator } from 'vee-validate';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;


Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate, {
  locale: 'zh_TW',
});
Vue.use(VueAxios, axios);


Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
  /* eslint-enable no-new */
});
