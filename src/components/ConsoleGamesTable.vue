<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>System</th>
        <th>Title</th>        
        <th>Finished ?</th>
        <th>Fisical Disc ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.system}}</td>
        <td>{{game.title}}</td>            
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>        
        <td><input type="checkbox" v-model="game.fisical_disc" :disabled=true></td>
        
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'ConsoleGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/console').then((resp) =>{
      this.games = resp.data.games;      
    });
    
  }  
}
</script>

<style scoped>

  /*Not Working*/
  td input[type=checkbox]:checked {
    background-color: blue !important;
    color: blue !important;
  }
</style>