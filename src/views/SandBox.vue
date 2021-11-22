<template>
  <div class="container py-4" style="margin-top: 50px">
    <h1>SandBox</h1>
    <div class="row">
       <Chart/>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
export default {
  name: "SandBox",
  components: {
    Chart
  },
  data() {
    return {};
  },
  setup() {    
    
  },
  created() {
    
  },
};
</script>

<style scoped>
</style>