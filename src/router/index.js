import Vue from 'vue'
import VueRouter from 'vue-router'
import { clearPending } from '../plugins/pendding/pendding'
const My = () => import('../views/my/My')
const Find = () => import('../views/find/Find')
const Village = () => import('../views/village/Village')
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home'),
    children: [
      { path: '/my', component: My },
      { path: '/find', component: Find },
      { path: '/village', component: Village }
    ],
    redirect: '/my'
  },
  {
    path: '/',
    component: () => import('../views/home/Home'),
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/users/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/users/Register')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  clearPending()
  if (to.path === '/login' || to.path === '/resgiter') return next()
  // if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    window.sessionStorage.clear()
    if (to.path === '/register') {
      return next()
    } else { return next('/login') }
  }
  return next()
})

export default router
