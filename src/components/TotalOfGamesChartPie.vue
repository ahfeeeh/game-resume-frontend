<template>
  <div>
    <canvas id="chartpie"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";

export default {
  name: "ChartPie",
  data() {
    return {
      chartData: {
        type: "pie",
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              data: [],
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#71706d",
              borderWidth: 1,
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
          title: {
            display: true,
            text: "",
          },
        },
      },
    };
  },
  async mounted() {
    try {
      const api_data = await axios.get(
        "http://localhost:4000/charts?type=total_percent"
      );
      this.chartData.data.labels = api_data.data.labels;
      this.chartData.data.datasets[0].backgroundColor = [
        "rgba(255,101,80,.5)",
        "rgba(255,203,80,.5)",
        "rgba(255,103,198,.5)",
        "rgba(128,103,198,.5)",
        "rgba(128,255,198,.5)",
        "rgba(255,255,36,.5)",
        "rgba(255,178,255,.5)",
      ];
      this.chartData.data.datasets[0].label = api_data.data.dataset;
      this.chartData.data.datasets[0].data = api_data.data.values;
      this.chartData.options.title.text = "Percent of Total Games";
    } catch (error) {
      console.error(error);
    }

    const ctx = document.getElementById("chartpie");
    new Chart(ctx, this.chartData);
  },
};
</script>