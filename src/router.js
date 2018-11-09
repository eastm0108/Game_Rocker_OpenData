import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './components/Dashboard.vue';
// import Login from '';
import Products from './views/Products.vue';
import Coupons from './views/Coupons.vue';
import Orders from './views/Orders.vue';
import TestOrder from './views/TestOrder.vue';
import CustomerCheckout from './views/CustomerCheckout.vue';
import Customer from './views/Customer.vue';
import OrdersCheck from './views/OrdersCheck.vue';
import Categories from './views/Categories.vue';
import Itemdata from './views/Itemdata.vue';
import OrdersPay from './views/OrdersPay.vue';
import PayCheck from './views/PayCheck.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'test_order',
          name: 'TestOrder',
          component: TestOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },
    {
      path: '/',
      name: 'Customer',
      component: Customer,
      children: [
        {
          path: 'orders_check/:orderId',
          name: 'OrdersCheck',
          component: OrdersCheck,
        },
      ],
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
    },
    {
      path: '/itemdata/:productId',
      name: 'Itemdata',
      component: Itemdata,
    },
    {
      path: '/orders_pay',
      name: 'OrdersPay',
      component: OrdersPay,
    },
    {
      path: '/pay_check/:orderId',
      name: 'PayCheck',
      component: PayCheck,
    },
    // {
    //   path: '/',
    //   name: 'Dashboard',
    //   component: Dashboard,
    //   children: [
    //     {
    //       path: 'test_order',
    //       name: 'TestOrder',
    //       component: TestOrder,
    //     },
    //     {
    //       path: 'customer_checkout/:orderId',
    //       name: 'CustomerCheckout',
    //       component: CustomerCheckout,
    //     },
    //   ],
    // },
  ],
});
