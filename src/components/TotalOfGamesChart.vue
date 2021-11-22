<template>
  <div>
    <canvas id="totalchart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

import axios from "axios";

export default {
  name: "TotalOfGamesChart",
  data() {
    return {
      chartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      },
    };
  },
  async mounted() {
    try {
      setTimeout( async () => {
        const api_data = await axios.get(
          "http://localhost:4000/charts?type=total"
        );
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset;
        this.chartData.data.datasets[0].data = api_data.data.values;
      }, 1000);
    } catch (error) {
      console.error(error);
    }

    const ctx = document.getElementById("totalchart");
    new Chart(ctx, this.chartData);
  },
};
</script>