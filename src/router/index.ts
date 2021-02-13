import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/auth/Signin.vue'
import Validate from '../views/auth/Validate.vue'
import Dashboard from '../views/cp/Dashboard.vue'
import Deposit from '../views/account/Deposit.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: 'sign-in'
    },
    name: 'home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: Signin
  },
  {
    path: '/validate',
    name: 'validate',
    component: Validate
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      isAuthenticatedRoute: true,
    }
  },
  {
    path: '/account/deposit',
    name: 'account.deposit',
    component: Deposit,
    meta: {
      isAuthenticatedRoute: true,
    }
  },
  {
    path: '/account/deposit/:paymentId',
    name: 'account.deposit',
    component: Deposit,
    meta: {
      isAuthenticatedRoute: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.isAuthenticatedRoute)) {

    const bearerToken = sessionStorage.getItem('crypto.auth.bearer');

    if (bearerToken === undefined || bearerToken === null)
      return next({name: 'sign-in'});

    return next();
  }

  next();
});

export default router
