import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GameListPage from '../pages/GameListPage.vue'
import CreateGamePage from '../pages/CreateGamePage.vue'
import EditGamePage from '../pages/EditGamePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/games',
      name: 'game-list',
      component: GameListPage
    },
    {
      path: '/create-game',
      name: 'create-game',
      component: CreateGamePage
    },
    {
      path: '/edit-game/:id',
      name: 'edit-game',
      component: EditGamePage
    }
  ]
})

export default router