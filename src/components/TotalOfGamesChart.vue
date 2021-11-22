<template>
  <div>
    <canvas id="totalofgameschart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export default {
  name: "TotalOfGamesChart",
  data() {
    return {
      chartData: {
        type: "line",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Total of Games",
            },
          },
        },
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      },
    };
  },
  async mounted() {
    try {
      setTimeout(async () => {
        const api_data = await axios.get(
          "http://localhost:4000/charts?type=total"
        );
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset;
        this.chartData.data.datasets[0].data = api_data.data.values;
        const ctx = document
          .getElementById("totalofgameschart")
          .getContext("2d");
        new Chart(ctx, this.chartData);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>