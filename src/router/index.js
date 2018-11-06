import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import TestOrder from '@/components/pages/TestOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Customer from '@/components/pages/Customer';
import OrdersCheck from '@/components/pages/OrdersCheck';
import Categories from '@/components/pages/Categories';
import Itemdata from '@/components/pages/Itemdata';
import OrdersPay from '@/components/pages/OrdersPay';
import PayCheck from '@/components/pages/PayCheck';

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
      component: Login,
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
