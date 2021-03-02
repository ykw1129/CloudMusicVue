import Vue from 'vue'
import VueRouter from 'vue-router'
import sessionMethods from '../plugins/sessionStorage'
import localMethods from '../plugins/localStorage'
import {
  clearPending
} from '../plugins/pendding/pendding'
const My = () => import('../views/my/My')
const Find = () => import('../views/find/Find')
const Village = () => import('../views/village/Village')
const Detail = () => import('../views/my/MyDetail')
const Player = () => import('../views/player/Player')
const PlayList = () => import('../views/playlist/PlayList')
const Search = () => import('../views/search/Search')
Vue.use(VueRouter)

const routes = [{
  path: '/home',
  name: 'Home',
  component: () => import('../views/home/Home'),
  children: [{
    path: '/my',
    component: My,
    meta: { title: 'My', show: true },
    children: [
      {
        path: '/MyDetail',
        component: Detail
      }
    ]
  },
  {
    path: '/find',
    component: Find
  },
  {
    path: '/village',
    component: Village
  }
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
},
{
  path: '/player/:id',
  name: 'Player',
  component: Player
},
{
  path: '/playlist/:id',
  name: 'PlayList',
  component: PlayList

}, {
  path: '/search',
  name: 'Search',
  component: Search
}
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  clearPending()
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenStr = sessionMethods.getSession('token')
  if (!tokenStr) {
    sessionMethods.clearSession()
    localMethods.clearLocal()
    if (to.path === '/register') {
      return next()
    } else {
      return next('/login')
    }
  }
  next()
})

export default router
