<template>
  <div class="container py-4" style="margin-top: 50px">
    <div class="about">
      <h1>Unfinished Games Table</h1>
      <FinishedGamesTable :games="this.games" />
    </div>
  </div>
</template>

<script>
import FinishedGamesTable from "@/components/FinishedGamesTable.vue";
import { request, gql } from "graphql-request";

const query = gql`
  {
    games: allGamesUnfinished {
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
  created() {
    const vm = this;
    request("http://localhost:4000/graphql", query).then((data) => {
      vm.games = data.games;
    });
  },
};
</script>

<style>
</style>