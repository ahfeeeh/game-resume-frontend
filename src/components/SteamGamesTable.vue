<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>AppID</th>
        <th>Title</th>        
        <th>Finished ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in getGames" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.appid}}</td>
        <td>{{game.name}}</td>            
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>        
        <td>
          <button type="button" class="btn btn-success btn-sm" @click="toggleModalFinished(idx)"><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;          
        </td>
      </tr>
    </tbody>   
</table>
<Modal @close="toggleModalFinished" :modalActive="modalActiveFinished">
        <template v-slot:modal-header>
            Mark Game as Finished
        </template>
      
       
        <template v-slot:modal-content>            
            <h2>Are you sure you want to mark this game as finished?</h2>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="finishItem(getCurrentIdx, toggleModalFinished)">Mark as Finished</button>
        </template>
    </Modal> 
</template>

<script>

import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";

import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
import { ref } from "vue";

export default {
  name: 'SteamGamesTable',
  setup() {

    const store = useStore();   
    
    const modalActiveFinished = ref(false);
    
    const toggleModalFinished = (idx) => {
      modalActiveFinished.value = !modalActiveFinished.value;      
       if(modalActiveFinished.value){
        console.log('are you sure Finished ? ', idx)
        store.commit("SELECT_ITEM", idx);        
      } 
    };
     
      const toast = useToast();

      return { toast, 
      modalActiveFinished, 
      toggleModalFinished, store }
    },
  data() { return { } },
  computed: mapGetters(['getGames', 'getSelectedGame', 'getCurrentIdx']),
  created() {},
  mounted() {
   this.getItems();        
  },
  methods: {
    getItems(){
      this.store.dispatch('getGames', { payload:{table: 'steam'}, toast: this.toast })
    },
    finishItem(idx, toggleModal) {            
      this.store.dispatch('finishGame', { payload:{idx, table: 'steam'}, toast: this.toast })
      toggleModal();   
    }    
  },
  components: {
    Modal  
  }        
}
</script>

<style scoped>

</style>