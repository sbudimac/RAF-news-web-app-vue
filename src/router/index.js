import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/platforma',
    name: 'Platforma',
    component: () => import('../views/Platforma.vue')
  },
  {
    path: '/najcitanije',
    name: 'Najcitanije',
    component: () => import('../views/Najcitanije.vue')
  },
  {
    path: '/kategorije',
    name: 'Kategorije',
    component: () => import('../views/Kategorije.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
