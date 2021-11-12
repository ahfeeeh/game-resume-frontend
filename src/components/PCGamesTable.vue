<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>Platform</th>
        <th>Title</th>        
        <th>Finished ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.platform}}</td>
        <td>{{game.name}}</td>            
        <td>{{game.finished}}</td>        
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'PCGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/pc').then((resp) =>{
      this.games = resp.data.games;      
    });
    
  }  
}
</script>

<style scoped>

</style>