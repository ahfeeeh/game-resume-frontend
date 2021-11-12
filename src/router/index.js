import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all_games',
    name: 'AllGames',
    component: () => import('../views/AllGames.vue')
  },
  {
    path: '/origin',
    name: 'OriginGames',
    component: () => import('../views/OriginGames.vue')
  },  
  {
    path: '/ubisoft',
    name: 'UbisoftGames',
    component: () => import('../views/UbisoftGames.vue')
  },
  {
    path: '/steam',
    name: 'SteamGames',
    component: () => import('../views/SteamGames.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
