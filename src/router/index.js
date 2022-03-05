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
    path: '/gamecube',
    name: 'GameCubeGames',
    component: () => import('../views/GameCubeGames.vue')
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
    path: '/charts',
    name: 'Charts',
    component: () => import('../views/MyCharts.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('../views/GenresResume.vue')
  },
  {
    path: '/finished_over_system',
    name: 'Finished Over System',
    component: () => import('../views/FinishedOverSystem.vue')
  },
  {
    path: '/gamesbygenres',
    name: 'GamesByGenres',
    component: () => import('../views/GamesByGenres.vue')
  },
  {
    path: '/genre/:query',
    name: 'Genre Search',    
    component: () => import('../views/GamesByGenreSearch.vue'),
    props: true    
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
  },
  {
    path: '/tobuy',
    name: 'TOBuyGames',
    component: () => import('../views/ToBuyGames.vue')
  },
  {
    path: '/dlcs',
    name: 'DLCGames',
    component: () => import('../views/DLCGames.vue')
  },
  {
    path: '/virtualconsole',
    name: 'VirtualConsoleGames',
    component: () => import('../views/VirtualConsoleGames.vue')
  },
  {
    path: '/playing',
    name: 'PlayingGames',
    component: () => import('../views/PlayingGames.vue')
  },
  {
    path: '/finished',
    name: 'FinishedGames',
    component: () => import('../views/FinishedGames.vue')
  },
  {
    path: '/unfinished',
    name: 'UnfinishedGames',
    component: () => import('../views/UnfinishedGames.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
