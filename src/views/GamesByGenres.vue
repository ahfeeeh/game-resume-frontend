<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>Games by Genres</h1>
    <div class="row">
      <div class="col">
        <h6>All Games Genres</h6>
        <TotalGenresTableLink :data="this.genres" />
      </div>      
    </div>
  </div>
</template>

<script>
import TotalGenresTableLink from "@/components/TotalGenresTableLink.vue";
import { request, gql } from "graphql-request";

const query = gql`
{
  genres: allGamesGenresAggregate {
    genre
    total
  }
}
`;

export default {
  name: "GenresResume",
  components: {
    TotalGenresTableLink    
  },
  data() {
    return {
      genres: []      
    };
  },
  created() {
    const vm = this;
    request("http://localhost:4000/graphql", query).then((data) => {
      vm.genres = data.genres;      
    });
  },
};
</script>

<style scoped>
</style>