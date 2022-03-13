<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>Charts</h1>
    <div class="row">
      <div class="col">
        <TotalOfGamesChart :labels="this.total_chart.labels" :label="this.total_chart.dataset" :values="this.total_chart.values" />
      </div>
      <div class="col">
        <TotalOfFinishedGamesChart :labels="this.finished_chart.labels" :label="this.finished_chart.dataset" :values="this.finished_chart.values" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <TotalOfGamesChartPie :labels="this.total_percent_chart.labels" :label="this.total_percent_chart.dataset" :values="this.total_percent_chart.values" />
      </div>
      <div class="col">
        <TotalOfFinishedGamesChartPie />
      </div>
    </div>
  </div>
</template>

<script>
import { request, gql } from "graphql-request";
import TotalOfGamesChart from "@/components/TotalOfGamesChart.vue";
import TotalOfFinishedGamesChart from "@/components/TotalOfFinishedGamesChart.vue";
import TotalOfGamesChartPie from "@/components/TotalOfGamesChartPie.vue";
import TotalOfFinishedGamesChartPie from "@/components/TotalOfFinishedGamesChartPie.vue";

const query = gql`
  {
    total_chart: getTotalChart {
      stats {
        system
        total
        percentual
      }
      labels
      values
      dataset
    }
    finished_chart: getFinishedChart {
      stats {
        system
        total
        percentual
      }
      labels
      values
      dataset
    }
    total_percent_chart: getTotalPercentChart {
      stats {
        system
        total
        percentual
      }
      labels
      values
      dataset
    }
    percent_finished_chart: getPercentFinishedChart {
      stats {
        system
        total
        percentual
      }
      labels
      values
      dataset
    }
  }
`;

export default {
  name: "MyCharts",
  components: {
    TotalOfGamesChart,
    TotalOfFinishedGamesChart,
    TotalOfGamesChartPie,
    TotalOfFinishedGamesChartPie,
  },
  data() {
    return {
      total_chart: {},
      finished_chart: {},
      total_percent_chart: {},
      percent_finished_chart: {}      
    };
  },
  setup() {},
  created() {
    const vm = this;
    request(`${process.env.VUE_APP_BACKEND_SERVER}/graphql`, query).then((data) => {
      vm.total_chart = data.total_chart;      
      vm.finished_chart = data.finished_chart;
      vm.total_percent_chart = data.total_percent_chart;
      vm.percent_finished_chart = data.percent_finished_chart;      
    });
  },
};
</script>

<style scoped>
</style>