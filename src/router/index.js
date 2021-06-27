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
    path: '/cms_kategorije',
    name: 'CMSKategorije',
    meta: {
      authRequired: true
    },
    component: () => import('../views/CMSKategorije.vue')
  },
  {
    path: '/cms_vesti',
    name: 'CMSVesti',
    meta: {
      authRequired: true
    },
    component: () => import('../views/CMSVesti.vue')
  },
  {
    path: '/cms_pretraga',
    name: 'CMSSearch',
    meta: {
      authRequired: true
    },
    component: () => import('../views/CMSSearch.vue')
  },
  {
    path: '/cms_add_category',
    name: 'CMSAddCategory',
    meta: {
      authRequired: true
    },
    component: () => import('../views/CMSAddCategory.vue')
  },
  {
    path: '/cms_update_category',
    name: 'CMSUpdateCategory',
    meta: {
      authRequired: true
    },
    component: () => import('../views/CMSUpdateCategory.vue')
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

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'Login'})
      return;
    }
  }
  next();
});

export default router
