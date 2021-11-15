import { createStore } from 'vuex'

export default createStore({
  state: {
    games:[],
    selectedItem: {ID: "", NAME: "", FINISHED: null, FISICAL_DISC: null} 
  },
  mutations: {
    SAVE_GAMES(state, payload){      
      state.games = payload;
    },
    SELECT_ITEM(state, payload){
      console.log("STATE / PAYLOAD")
      console.log(state,payload)
      state.selectedItem = state.games[payload];
    }
  },
  actions: {
  },
  modules: {
  }
})
