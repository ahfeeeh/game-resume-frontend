<template>
  <div>
    <canvas id="finishedchart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";

export default {
  name: "TotalOfFinishedGamesChart",
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
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
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
      setTimeout(async () => {
        const api_data = await axios.get(
          "http://localhost:4000/charts?type=finished"
        );
        this.chartData.data.labels = api_data.data.labels;
        this.chartData.data.datasets[0].label = api_data.data.dataset;
        this.chartData.data.datasets[0].data = api_data.data.values;
      }, 1500);
    } catch (error) {
      console.error(error);
    }

    const ctx = document.getElementById("finishedchart");
    new Chart(ctx, this.chartData);
  },
};
</script>