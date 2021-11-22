<template>
  <div>
    <canvas id="totalofgameschartpie"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  name: "TotalOfGamesChartPie",
  data() {
    return {
      chartData: {
        type: "doughnut",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Percentual of Games",
            },
          },
        },
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        },
      },
    };
  },
  async mounted() {
    setTimeout(async () => {
      try {
        const api_data = await axios.get(
          "http://localhost:4000/charts?type=total_percent"
        );
        console.log(api_data);
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset;
        this.chartData.data.datasets[0].data = api_data.data.values;        
        const ctx = document
          .getElementById("totalofgameschartpie")
          .getContext("2d");
        new Chart(ctx, this.chartData);
      } catch (error) {
        console.error(error);
      }
    }, 1500);
  },
};
</script>