import { createRouter, createWebHashHistory } from 'vue-router'
import homeView from '../views/home-view.vue'
import boardView from '../views/board-view.vue'
import aboutView from '../views/about-view.vue'
import playerView from '../views/player-view.vue'

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
      path: '/board/:boardId', // /:boardId
      name: 'board',
      component: boardView,
      children: [
        {
          path: ':playerId',
          component: playerView,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView,
    },
  ],
})

export default router
