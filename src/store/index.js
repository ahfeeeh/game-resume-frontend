import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    hashMap: new Map(),
    games: [],
    selectedItem: {},
    currentIdx: -1
  },
  mutations: {
    SAVE_GAMES(state, payload) {
      state.hashMap = new Map()

      let tag;
      payload.games.forEach(game => {
        if (payload.isDLC) {
          tag = game.id;
        } else {
          tag = game.app_id ? game.app_id : game.id;
        }

        state.hashMap.set(tag, game)
      })
      state.games = Array.from(state.hashMap.values());
    },
    SELECT_ITEM(state, payload) {
      state.selectedItem = state.hashMap.get(payload);
      state.currentIdx = [payload]
    }
  },
  actions: {
    getGames(context, { payload, toast }) {
      axios.get(`${process.env.VUE_APP_BACKEND_SERVER}/${payload.table}`).then((resp) => {
        context.commit("SAVE_GAMES", { games: resp.data.games, isDLC: payload.table === 'dlcs' });
        toast.success('Data Loaded Successfully', { timeout: 2000 });
      }).catch((rej) => {
        console.error(rej)
        toast.error("Error on Loading API");
      });
    },
    finishGame(context, { payload, toast }) {

      context.commit('SELECT_ITEM', payload.idx);

      let api_payload;
       
        api_payload = {
          id: context.state.selectedItem.id,
          app_id: context.state.selectedItem.app_id,
          title: context.state.selectedItem.title,
          table: payload.table,                    
          finished: !context.state.selectedItem.finished
        }      

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER}/finished`, api_payload).then((resp) => {

        if (resp) {
          context.dispatch('getGames', { payload: { table: payload.table }, toast });
          toast.success(`Success on Mark ${context.state.selectedItem.title} as ${!context.state.selectedItem.finished ? 'Finished' : 'Unfinished'} `)
        }
      }).catch((rej) => {
        console.error(rej)
        toast.error("Error on Save Changes on API");
      });
    },
    deleteGame(context, { payload, toast }) {

      context.commit('SELECT_ITEM', payload.idx);

      let api_payload;

      api_payload = {
        table: payload.table,
        title: context.state.selectedItem.title,
        id: context.state.selectedItem.id
      }

      axios.delete(`${process.env.VUE_APP_BACKEND_SERVER}/remove`, { data: api_payload }).then((resp) => {
        if (resp) {
          // FIX
          context.dispatch('getGames', { payload: { table: payload.table }, toast });
          toast.success(`Success on Remove ${context.state.selectedItem.title} from Database`)
        }
      }).catch((rej) => {
        console.error(rej)
        toast.error("Error on Remove Data API");
      });

    },
    updateGame(context, { payload, toast, toggleModal }) {

      let api_payload;

      if (payload.table === 'tobuy') {
        api_payload = {
          id: payload.id,
          title: payload.title,
          finished: payload.finished,
          system: payload.system,
          table: payload.table,
          magnetic_link: payload.magnetic_link
        }
      } else if (payload.table === 'virtualconsole') {
        api_payload = {
          id: payload.id,          
          app_id: payload.app_id,
          system_id: payload.system_id,
          title: payload.title,
          finished: payload.finished,          
          genuine: payload.genuine,          
          table: payload.table
        }
      } else if (payload.table === 'dlcs') {
        api_payload = {
          id: payload.id,
          app_id: payload.app_id,
          title: payload.title,
          finished: payload.finished,
          collection: payload.collection,
          table: payload.table
        }
      } else {
        api_payload = {
          id: payload.id,
          app_id: payload.app_id,
          system_id: payload.system_id,
          title: payload.title,
          finished: payload.finished,
          finished_at: payload.finished_at,
          collection: payload.collection,
          genuine: payload.genuine,
          fisical_disc: payload.fisical_disc,
          table: payload.table
        }
      }

      axios.put(`${process.env.VUE_APP_BACKEND_SERVER}/update`, api_payload).then((resp) => {
        if (resp) {
          context.dispatch('getGames', { payload: { table: payload.table }, toast });
          toggleModal()
          toast.success(`Success on Update ${context.state.selectedItem.title}`)
        }
      }).catch((rej) => {
        console.error(rej)
        toast.error("Error on Save Changes on API");
      });


    },
    saveGame(context, { payload, toast, toggleModal }) {

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER}/create`, payload).then((resp) => {
        if (resp) {
          toast.success(`Success on Create ${payload.title}`)
          context.dispatch('getGames', { payload: { table: payload.table }, toast });
          toggleModal();
        }
      }).catch((rej) => {
        console.error(rej)
        toast.error("Error on Save Changes on API");
      })

    },
    markAsPlaying(context, { payload, toast }) {

      context.commit('SELECT_ITEM', payload.idx);

      const api_payload = {
        table: payload.table,
        id: context.state.selectedItem.id,
        app_id: context.state.selectedItem.app_id,
        title: context.state.selectedItem.title
      }

      axios.post(`${process.env.VUE_APP_BACKEND_SERVER}/create`, api_payload).then((resp) => {
        if (resp) {
          toast.success(`Success on Mark as Playing ${api_payload.title}`)
        }
      }).catch((rej) => {
        console.error(rej)
        toast.error("Game already marked as Playing");
      })

    },
  },
  modules: {

  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getSelectedGame(state) {
      return state.selectedItem;
    },
    getCurrentIdx(state) {
      return state.currentIdx;
    }
  }
})
