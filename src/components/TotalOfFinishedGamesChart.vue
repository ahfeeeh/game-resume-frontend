<template>
  <div>
    <canvas id="totaloffinishedgameschart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "TotalOfFinishedGamesChart",
  props: {
    labels: Array,
    label: String,
    values: Array,
  },
  computed: {
    chartData: function () {
      return {
        type: "line",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Total of Finished Games",
            },
          },
        },
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.label,
              data: this.values,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      };
    },
  },
  mounted() {
    const ctx = document.getElementById("totaloffinishedgameschart").getContext("2d");
    setTimeout(() => {
      new Chart(ctx, this.chartData);
    }, 2000);
  },
};
</script>