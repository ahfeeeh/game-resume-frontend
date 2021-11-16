import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    games:[],
    selectedItem: {ID: "", NAME: "", APPID: -1, FINISHED: null, FISICAL_DISC: null},
    currentIdx: -1 
  },
  mutations: {
    SAVE_GAMES(state, payload){      
      state.games = payload;
    },
    SELECT_ITEM(state, payload){
      state.selectedItem = state.games[payload];
      state.currentIdx = [payload]
    }
  },
  actions: {
    getGames(context,{ payload, toast}){
      console.log('getGames Payload');
      console.log(payload);     

      axios.get(`http://localhost:4000/${payload.table}`).then((resp) =>{        
      context.commit("SAVE_GAMES", resp.data.games);        
      toast.success('Data Loaded Successfully', { timeout: 2000 });
    }).catch((rej) => {
      console.error(rej)
        toast.error("Error on Loading API");
    }); 
    },
    finishGame(context, { payload, toast }){

      context.commit('SELECT_ITEM', payload.idx);  

      console.log('finishGame Payload');
      console.log(payload);  

      let api_payload;
      if (payload.table === 'wiiu'){
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME,
          finished: !context.state.selectedItem.FINISHED
          }      
      } else if (payload.table === 'wii') {
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.Name,
          finished: !context.state.selectedItem.Finished
          }      
      } else if (payload.table === 'ubisoft') {
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME,
          finished: !context.state.selectedItem.FINISHED
          }      
      } else if (payload.table === 'origin') {
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME,
          finished: !context.state.selectedItem.FINISHED
          }      
      } else if (payload.table === 'steam') {        
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.name,
          appid: context.state.selectedItem.appid,
          finished: !context.state.selectedItem.finished
          }      
      }            
      
      axios.post('http://localhost:4000/finished', api_payload).then((resp)=>{
        
        if(resp){
          context.dispatch('getGames', { payload:{table: payload.table}, toast });
          toast.success(`Success on Mark ${context.state.selectedItem.NAME || context.state.selectedItem.name || context.state.selectedItem.Name } as ${!context.state.selectedItem.FINISHED ? 'Finished': 'Unfinished'} `)
        }         
      }).catch((rej) => {
      console.error(rej)
        toast.error("Error on Save Changes on API");
    }); 
    },deleteGame(context, { payload, toast }) {

      context.commit('SELECT_ITEM', payload.idx);
      
      console.log('deleteGame Payload');
      console.log(payload);

      let api_payload;

      if(payload.table === 'wiiu'){
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME        
          }    
      } else if (payload.table === 'wii'){
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.Name        
          }    
      } else if (payload.table === 'ubisoft'){
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME        
          }    
      } else if (payload.table === 'origin'){
        api_payload = {
          table: payload.table,
          title: context.state.selectedItem.NAME        
          }    
      }         

      axios.delete('http://localhost:4000/remove', { data: api_payload }).then((resp)=>{        
        if(resp){
          context.dispatch('getGames', { payload:{table: payload.table}, toast });
          toast.success(`Success on Remove ${context.state.selectedItem.NAME || context.state.selectedItem.Name } from Database`)
        }         
      }).catch((rej) => {        
      console.error(rej)
        toast.error("Error on Remove Data API");
    }); 

    },
    updateGame(context, {payload, toast, toggleModal}){
      
      console.log('updateGame Payload');
      console.log(payload);

      let api_payload;

      if(payload.table === 'wiiu'){
        api_payload = {
          idx: payload.IDX,
          id: payload.ID,
          title: payload.NAME,
          finished: payload.FINISHED,
          fisical_disc: payload.FISICAL_DISC,
          table: payload.table
        }
      } else if (payload.table === 'wii') {        
        api_payload = {
          idx: payload.IDX,
          id: payload.ID,
          title: payload.Name,
          finished: payload.Finished,
          fisical_disc: payload['Fisical Disc'],
          table: payload.table
        }
      } else if (payload.table === 'ubisoft') {        
        api_payload = {
          idx: payload.IDX,
          id: payload.ID,
          title: payload.NAME,
          finished: payload.FINISHED,          
          table: payload.table
        }
      } else if (payload.table === 'origin') {        
        api_payload = {
          idx: payload.IDX,
          id: payload.ID,
          title: payload.NAME,
          finished: payload.FINISHED,          
          table: payload.table
        }
      }


      

      axios.put('http://localhost:4000/update', api_payload).then((resp)=>{
        if(resp){
          context.dispatch('getGames', { payload:{table: payload.table}, toast });
          toggleModal()
          toast.success(`Success on Update ${context.state.selectedItem.NAME || context.state.selectedItem.Name }`)
        }         
      }).catch((rej) => {
      console.log(rej)
        toast.error("Error on Save Changes on API");
    }); 


    },
    saveGame(context, {payload, toast, toggleModal}) {
      console.log('saveGame Payload');
      console.log(payload);

      axios.post('http://localhost:4000/create', payload).then((resp)=>{
        if(resp){          
          toast.success(`Success on Create ${payload.title}`)
          context.dispatch('getGames', { payload:{table: payload.table}, toast });
          toggleModal();          
        }         
      }).catch((rej) => {
      console.error(rej)
        toast.error("Error on Save Changes on API");
    })

    }
  },
  modules: {

  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getSelectedGame(state){
      return state.selectedItem;
    },
    getCurrentIdx(state){
      return state.currentIdx;
    }
  }
})
