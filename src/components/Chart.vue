<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../chartdata.js'

export default {
  name: 'Chart',
  data() {
    return {
      chartData: chartData
    }
  },
  mounted() {
    const ctx = document.getElementById('chart');
    new Chart(ctx, this.chartData);
  }
}
</script>