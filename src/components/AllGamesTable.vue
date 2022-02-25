<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Id</th>
        <th>AppID</th>
        <th>Title</th>
        <th>Platform</th>
        <th>System</th>
        <th>Finished ?</th>
        <th>Collection ?</th>
        <th>Genuine ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{game.id }}</td>
        <td>{{game.app_id }}</td>
        <td>{{game.title}}</td>    
        <td>{{game.platform}}</td>
        <td>{{game.system}}</td>
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>                
        <td><input type="checkbox" v-model="game.collection" :disabled=true></td>                
        <td><input type="checkbox" v-model="game.genuine" :disabled=true></td>                
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'AllGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/all').then((resp) =>{
      this.games = resp.data.games;      
    });
    
  }  
}
</script>

<style scoped>

</style>