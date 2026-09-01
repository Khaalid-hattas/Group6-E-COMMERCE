import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router