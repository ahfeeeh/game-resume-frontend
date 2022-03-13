<template>
  <div>
    <canvas id="totaloffinishedgameschartpie"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  name: "TotalOfFinishedGamesChartPie",
  data() {
    return {
      chartData: {
        type: "doughnut",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Percentual of Finished Games",
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
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgba(7, 174, 89)",
                "rgba(236, 255, 0)",
                "rgba(189, 0, 255)"
              ],
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
          `${process.env.VUE_APP_BACKEND_SERVER}/charts?type=finished_percent`
        );
        this.chartData.data.labels = api_data.data.labels;        
        this.chartData.data.datasets[0].data = api_data.data.values;
        const ctx = document
          .getElementById("totaloffinishedgameschartpie")
          .getContext("2d");
        new Chart(ctx, this.chartData);
      } catch (error) {
        console.error(error);
      }
    }, 1600);
  },
};
</script>