import { createRouter, createWebHashHistory } from 'vue-router'
import homeView from '../views/home-view.vue'
import boardView from '../views/board-view.vue'
import aboutView from '../views/about-view.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    {
      path: '/board',
      name: 'board',
      component: boardView,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView,
    },
  ],
})

export default router
