<template>
  <div class="container py-4" style="margin-top:50px">
      <div class="about">
          <h1>Search Page</h1>
          <p>{{ query }}</p>
          <ul><li v-for="game, idx in games" :key="idx">{{game.title}}</li></ul>
      </div>          
  </div>
</template>

<script>
import axios from 'axios';

export default {
 name: "Search Page",
 props: ['query'],
 data(){
     return {
         route: this.$route.params,
         games: []
     }
 },
 methods: {
   searchGames(query) {
     axios.get(`http://localhost:4000/search?query=${query}`).then(data => {
        this.games = data.data.games;     
     });     
   }
 },
 created(){
   if (this.route.query){     
     this.searchGames(this.route.query);
   }
 },
 watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from)
      this.route = to.params.query
    }
  }
}
</script>

<style>

</style>