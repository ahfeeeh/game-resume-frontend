<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>ID</th>
        <th>Title</th>
        <th>Finished ?</th>
        <th>Fisical Disc ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.ID}}</td>
        <td>{{game.NAME}}</td>      
        <td><input type="checkbox" v-model="game.FINISHED" :disabled=true></td>   
        <td><input type="checkbox" v-model="game.FISICAL_DISC" :disabled=true></td>
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'WiiUGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/wiiu').then((resp) =>{
      this.games = resp.data.games;      
    });
    
  }  
}
</script>

<style scoped>

</style>