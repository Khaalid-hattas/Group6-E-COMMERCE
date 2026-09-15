import { createRouter, createWebHistory } from 'vue-router'

import Artwork from '../views/Artwork.vue'
import Handmade from '../views/Handmade.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/artwork',
      name: 'artwork',
      component: Artwork,
    },
    {
      path: '/handmade',
      name: 'handmade',
      component: Handmade,
    },
  ],
})

export default router