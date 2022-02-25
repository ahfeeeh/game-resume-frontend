<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>Games Resume</h1>
    <div class="row">
      <div class="col">
        <h6>Total of Games</h6>
        <TotalsTable :data="this.totals_data" />
      </div>
      <div class="col">
        <h6>Total of Finished Games</h6>
        <TotalsFinishedTable :data="this.finished_data" />
      </div>
    </div>
  </div>
</template>

<script>
import TotalsTable from "@/components/TotalsTable.vue";
import TotalsFinishedTable from "@/components/TotalsFinishedTable.vue";
import { request, gql } from "graphql-request";

const query = gql`
  query {
    total_games: getStatisticsOfTotalGames {
      description
      total_games: total
    }

    finished_games: getStatisticsOfTotalFinishedGames {
      description
      total_games_finished:total
    }
  }
`;

export default {
  name: "GamesResume",
  components: {
    TotalsTable,
    TotalsFinishedTable,
  },
  data() {
    return {
      totals_data: [],
      finished_data: []      
    };
  },
  created() {
    const vm = this;
    request("http://localhost:4000/graphql", query).then((data) => {
      vm.totals_data = data.total_games;
      vm.finished_data = data.finished_games;
    });
  },
};
</script>

<style scoped>
</style>