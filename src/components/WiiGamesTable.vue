<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>ID</th>
        <th>Size(GB)</th>
        <th>Title</th>
        <th>Type</th>        
        <th>Finished ?</th>
        <th>Fisical Disc ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.ID}}</td>
        <td>{{game['Size(GB)']}}</td>            
        <td>{{game.Name}}</td>      
        <td>{{game.Type}}</td>  
        <td>{{game.Finished}}</td>   
        <td>{{game['Fisical Disc']}}</td>
      </tr>
    </tbody>   
</table>
</template>

<script>

import axios from 'axios';

export default {
  name: 'WiiGamesTable',
  data() {
    return {
      games: []      
    }
  },
  created() {
    axios.get('http://localhost:4000/wii').then((resp) =>{
      this.games = resp.data.games;      
      console.log(this.games)
    });
    
  }  
}
</script>

<style scoped>

</style>