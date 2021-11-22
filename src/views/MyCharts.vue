<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>Charts</h1>
    <div class="row">
      <div class="col">
        <TotalOfGamesChart />
      </div>
      <div class="col">
        <TotalOfFinishedGamesChart />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <TotalOfGamesChartPie />
      </div>
      <div class="col">
        
      </div>
    </div>
  </div>
</template>

<script>
import TotalOfGamesChart from "@/components/TotalOfGamesChart.vue";
import TotalOfGamesChartPie from "@/components/TotalOfGamesChartPie.vue";
import TotalOfFinishedGamesChart from "@/components/TotalOfFinishedGamesChart.vue";
export default {
  name: "MyCharts",
  components: {
    TotalOfGamesChart,
    TotalOfGamesChartPie,
    TotalOfFinishedGamesChart,
  },
  data() {
    return {};
  },
  setup() {},
  created() {},
};
</script>

<style scoped>
</style>