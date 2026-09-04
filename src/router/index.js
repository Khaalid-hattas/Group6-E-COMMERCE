import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/marketplace',
      component: () => import('../views/Marketplace.vue')
    },
    {
      path: '/creators',
      component: () => import('../views/Creators.vue')
    },
    {
      path: '/about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/customer-dashboard',
      component: () => import('../views/CustomerDashboard.vue')
    }
  ]
})

export default router