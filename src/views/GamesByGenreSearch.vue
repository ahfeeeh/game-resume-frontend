<template>
  <div class="container py-4" style="margin-top:50px">
      <div class="about">
          <h1>Search Page</h1>
          <p>Looking for: {{ query }}</p>          
          <SearchGamesByGenreTable :games="games" />
      </div>          
  </div>
</template>

<script>
import axios from 'axios';
import SearchGamesByGenreTable from '@/components/SearchGamesByGenreTable.vue';

export default {
 name: "Games By Genre Search Page",
 props: ['query'],
 data(){
     return {
         route: this.$route.params,
         games: []
     }
 },
 methods: {
   searchGames(query) {

     axios.get(`${process.env.VUE_APP_BACKEND_SERVER}/genre_search?query=${query}`).then(data => {
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
  },
  components: {
    SearchGamesByGenreTable
  }
}
</script>

<style>

</style>