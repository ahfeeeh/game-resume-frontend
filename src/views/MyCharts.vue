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
  </div>
</template>

<script>
import TotalOfGamesChart from '@/components/TotalOfGamesChart.vue'
import TotalOfFinishedGamesChart from '@/components/TotalOfFinishedGamesChart.vue'
export default {
  name: "MyCharts",
  components: {
    TotalOfGamesChart,
    TotalOfFinishedGamesChart
  },
  data() {
    return {};
  },
  setup() {    
    
  },
  created() {
    
  },
};
</script>

<style scoped>
</style>