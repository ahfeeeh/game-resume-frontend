<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>AppId</th>
        <th>System</th>
        <th>Title</th>        
        <th>Finished ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{game.app_id }}</td>
        <td>{{game.system}}</td>
        <td>{{game.title}}</td>            
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>        
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