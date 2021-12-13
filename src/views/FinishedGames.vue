<template>
   <div class="nav-scroller bg-body shadow-sm" style="margin-top: 60px">
        <nav class="nav nav-underline" aria-label="Secondary navigation">
          <a class="nav-link active" aria-current="page" @click="allFinishedGames" style="cursor:pointer">Normal List</a>          
          <a class="nav-link" @click="allFinishedGamesDetailed" style="cursor:pointer">Detailed List</a>          
        </nav>
  </div>  
  <div class="container py-4" style="margin-top: 50px">
    <div class="about">
      <h1>Finished Games Table</h1>
      <FinishedGamesTable :games="this.games" />
    </div>
  </div>
</template>

<script>
import FinishedGamesTable from "@/components/FinishedGamesTable.vue";
import { request, gql } from "graphql-request";

const queryAllFinished = gql`
  {
    games: allGamesFinished {
      title
      system
      finished
    }
  }
`;

const queryAllFinishedDetailed = gql`
  {
    games: allGamesFinishedDetailed {
      title
      system
      finished
    }
  }
`;

export default {
  components: {
    FinishedGamesTable,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    allFinishedGames() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllFinished).then(
        (data) => {          
          vm.games = data.games;          
        }
      );
    },
    allFinishedGamesDetailed() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllFinishedDetailed).then(
        (data) => {          
          vm.games = data.games;          
        }
      );
    },
  },
  created() {
    this.allFinishedGames();
  },
};
</script>

<style>
</style>