<template>
  <div>
    <canvas id="finishedchart"></canvas>
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
        const api_data = await axios.get("http://localhost:4000/charts?type=finished")            
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset;
        this.chartData.data.datasets[0].data = api_data.data.values;
        this.chartData.data.datasets[0].backgroundColor =  "rgba(71, 183,132,.5)";
        this.chartData.data.datasets[0].borderColor = "#47b784";
      } catch (error) {
          console.error(error)
      }  

    const ctx = document.getElementById('finishedchart');
    new Chart(ctx, this.chartData);
    
  }
}
</script>