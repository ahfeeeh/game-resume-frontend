<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>Genres Resume</h1>
    <div class="row">
      <div class="col">
        <h6>Console Games</h6>
        <TotalGenresTable :data="this.console_data" />
      </div>
      <div class="col">
        <h6>PC Games</h6>
        <TotalGenresTable :data="this.pc_data" />
      </div>
    </div>
  </div>
</template>

<script>
import TotalGenresTable from "@/components/TotalGenresTable.vue";
import { request, gql } from "graphql-request";

const query = gql`{
  console_games: allConsoleGamesGenres {
    genre
    total
  }
  pc_games: allPCGamesGenres {
    genre
    total
  }
}

`;

export default {
  name: "GenresResume",
  components: {
    TotalGenresTable    
  },
  data() {
    return {
      console_data: [],
      pc_data: []      
    };
  },
  created() {
    const vm = this;
    request(`${process.env.VUE_APP_BACKEND_SERVER}/graphql`, query).then((data) => {
      vm.console_data = data.console_games;
      vm.pc_data = data.pc_games;
    });
  },
};
</script>

<style scoped>
</style>