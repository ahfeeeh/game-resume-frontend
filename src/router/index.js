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
  },
  {
    path: '/wii',
    name: 'WiiGames',
    component: () => import('../views/WiiGames.vue')
  },  
  {
    path: '/wiiu',
    name: 'WiiUGames',
    component: () => import('../views/WiiUGames.vue')
  },    
  {
    path: '/pc',
    name: 'PCGames',
    component: () => import('../views/PCGames.vue')
  },    
  {
    path: '/console',
    name: 'ConsoleGames',
    component: () => import('../views/ConsoleGames.vue')
  },
  {
    path: '/sandbox',
    name: 'SandBox',
    component: () => import('../views/SandBox.vue')
  },
  {
    path: '/search/:query',
    name: 'Search',    
    component: () => import('../views/Search.vue'),
    props: true    
  },
  {
    path: '/resume',
    name: 'GamesResume',
    component: () => import('../views/GamesResume.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
