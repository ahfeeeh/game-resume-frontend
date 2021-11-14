<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>ID</th>
        <th>Title</th>
        <th>Finished ?</th>
        <th>Fisical Disc ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.ID}}</td>
        <td>{{game.NAME}}</td>      
        <td><input type="checkbox" v-model="game.FINISHED" :disabled=true></td>   
        <td><input type="checkbox" v-model="game.FISICAL_DISC" :disabled=true></td>
        <td>
          <button type="button" class="btn btn-success btn-sm"><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;
          <button type="button" class="btn btn-primary btn-sm" @click="buttonClick('Click on Edit')"><i class="fas fa-edit"></i> Edit</button> &nbsp;
          <button type="button" class="btn btn-secondary btn-sm" @click="buttonClick('Click on Delete')"><i class="fas fa-trash-alt"></i> Delete</button>
          
        </td>
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
  name: 'WiiUGamesTable',
  setup() {
    // https://github.com/Maronato/vue-toastification/tree/next
      // Get toast interface
      const toast = useToast();

      // Use it!
      toast("I'm a toast!");

      // or with options
      toast.success("My toast content", {
        timeout: 4000
      });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
    },
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/wiiu').then((resp) =>{
      this.games = resp.data.games;      
    });        
  },mounted() {
        // Since you returned `toast` from setup(), you can access it now
        this.toast.info("I'm an info toast!");
  }, 
  methods: {
    buttonClick(message) {
        this.toast.success(message, {
        timeout: 2000
      });
    }
  }  
}
</script>

<style scoped>

</style>