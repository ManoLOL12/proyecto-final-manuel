import { createRouter, createWebHistory } from 'vue-router'

// Cargar componentes con lazy loading
const HomePage = () => import('../pages/HomePage.vue')
const GameListPage = () => import('../pages/GameListPage.vue')
const CreateGamePage = () => import('../pages/CreateGamePage.vue')
const EditGamePage = () => import('../pages/EditGamePage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { isPublic: true }  // Puedes añadir meta para gestionar rutas públicas
    },
    {
      path: '/games',
      name: 'game-list',
      component: GameListPage,
      meta: { isPublic: false }
    },
    {
      path: '/create',
      name: 'create-game',
      component: CreateGamePage,
      meta: { isPublic: false }
    },
    {
      path: '/edit/:id',
      name: 'edit-game',
      component: EditGamePage,
      meta: { isPublic: false },
      props: true // Permite pasar los params como props
    }
  ]
})

export default router