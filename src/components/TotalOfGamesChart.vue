<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../chartdata.js'
import axios from 'axios';

export default {
  name: 'Chart',
  data() {
    return {
      chartData: chartData
    }
  },
  async mounted() {
     try {
        const api_data = await axios.get("http://localhost:4000/charts?type=total")            
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset
        this.chartData.data.datasets[0].data = api_data.data.values
      } catch (error) {
          console.error(error)
      }  

    const ctx = document.getElementById('chart');
    new Chart(ctx, this.chartData);
    
  }
}
</script>