import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import Artwork from '../Artwork.vue'
import Creators from '../Creators.vue'
import Handcraft from '../Handcraft.vue'
import Handmade from '../Handmade.vue'
import LandingPage from '../LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/handcraft',
      name: 'handcraft',
      component: Handcraft,
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: Handcraft,
    },
    {
      path: '/handmade',
      name: 'handmade',
      component: Handmade,
    },
    {
      path: '/artwork',
      name: 'artwork',
      component: Artwork,
    },
    {
      path: '/creators',
      name: 'creators',
      component: Creators,
    },
  ],
})

export default router
