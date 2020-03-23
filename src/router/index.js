import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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

export default router
