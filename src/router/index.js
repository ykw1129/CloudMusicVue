import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/home/Home'),
    children: [
      { path: '/my', name: 'My', component: () => import('../components/my/My') },
      { path: '/find', name: 'My', component: () => import('../components/find/Find') },
      { path: '/village', name: 'My', component: () => import('../components/village/Village') }
    ]
  },
  {
    path: '/',
    name: 'Home',
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
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
