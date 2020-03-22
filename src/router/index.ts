import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/filter',
    name: 'Filter',
    component: () => import(/* webpackChunkName: "filter" */ '../views/Filter.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = null;
  if (to.path === '/login' && token) {
    // redirect user if he is already logged in
    next({
      path: '/',
    });
  } else if (to.meta.requiresAuth && !token) {
    // if user is not logged in, redirect to login.
    // removeToken();
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
