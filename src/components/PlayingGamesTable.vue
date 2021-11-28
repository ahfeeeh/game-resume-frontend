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
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{game.idx }}</td>
        <td>{{game.id }}</td>
        <td>{{game.title}}</td>    
        <td>{{game.started_at}}</td>        
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>                
        <td>{{game.finished_at}}</td>        
        <td>{{game.observation}}</td>
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'PlayingGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/playing').then((resp) =>{
      this.games = resp.data.games;      
    });
    
  }  
}
</script>

<style scoped>

</style>