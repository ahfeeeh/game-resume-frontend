<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>ID</th>
        <th>Title</th>      
        <th>Started At </th>  
        <th>Finished ?</th>
        <th>Finished At</th>
        <th>Observation</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in getGames" :key="idx">
        <td>{{game.idx }}</td>
        <td>{{game.id }}</td>
        <td>{{game.title}}</td>    
        <td>{{game.started_at}}</td>        
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>                
        <td>{{game.finished_at}}</td>        
        <td>{{game.observation}}</td>
        <td>
          <div class="btn-group btn-group-sm" role="group">              
              <button type="button" class="btn btn-success btn-sm" @click="finishItem(idx)"><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;              
              <button type="button" class="btn btn-secondary btn-sm" @click="deleteItem(idx)"><i class="fas fa-trash-alt"></i> Delete</button>
          </div>          
        </td>
      </tr>
    </tbody>   
</table>
</template>

<script>

import { mapGetters } from 'vuex';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';

export default {
  name: 'PlayingGamesTable',
  setup() {
    const toast = useToast();
    const store = useStore();   
    return { toast, store } 
  },
  data() {
    return {}
  },
  computed: mapGetters(['getGames', 'getSelectedGame', 'getCurrentIdx']),
  created() {}, 
  mounted() {
    this.getItems();        
  },
  methods: {
    getItems(){
      this.store.dispatch('getGames', { payload:{table: 'playing'}, toast: this.toast })
    },
    finishItem(idx) {                  
      this.store.dispatch('finishGame', { payload:{idx, table: 'playing'}, toast: this.toast })      
    },
    deleteItem(idx) {      
      this.store.dispatch('deleteGame', { payload:{idx, table: 'playing'}, toast: this.toast })        
    },
  }  
}
</script>

<style scoped>

</style>