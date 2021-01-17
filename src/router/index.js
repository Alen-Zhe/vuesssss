import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import homeClass from '../views/Home-class.vue'
import homeIndex from '../views/Home-index.vue'
import homeGoods from '../views/Home-goods'
import homeDetail from '../views/Home-detail.vue'
import addGood from '../views/Home-addgood'
import userDate from "../views/userDate"
import orderDate from "../views/Home-order"
import register from "../views/register"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      needLogin: false,
    },
    children: [{
        path: '/homeindex',
        name: 'homeIndex',
        component: homeIndex,
      }, {
        path: '/class',
        name: 'homeClass',
        component: homeClass,
      },
      {
        path: '/homegoods',
        name: 'homeGoods',
        component: homeGoods,
      },
      {
        path: '/homedetail',
        name: 'homeDetail',
        component: homeDetail,
      }, {
        path: '/addgood',
        name: 'addGood',
        component: addGood,
      }, {
        path: '/userdate',
        name: 'userdate',
        component: userDate,
      }, {
        path: '/orderdate',
        name: 'orderDate',
        component: orderDate,
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router