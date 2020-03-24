import Vue from 'vue'
import VueRouter from 'vue-router'
const My = () => import('../components/my/My')
const Find = () => import('../components/find/Find')
const Village = () => import('../components/village/Village')
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/home/Home'),
    children: [
      { path: '/my', component: My },
      { path: '/find', component: Find },
      { path: '/village', component: Village }
    ],
    redirect: '/my'
  },
  {
    path: '/',
    component: () => import('../components/home/Home'),
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/users/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/users/Register')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/resgiter') return next()
  // if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    if (to.path === '/register') {
      return next()
    } else { return next('/login') }
  }
  return next()
})

export default router
