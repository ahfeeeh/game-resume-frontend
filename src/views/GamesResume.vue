<template>
<div class="container py-4" style="margin-top:50px">
    <h1>Games Resume</h1>
    <div class="row">
      <div class="col">
        <h6>Total of Games</h6>
          <TotalsTable />
        </div>
      <div class="col">
        <h6>Total of Finished Games</h6>
          <TotalsFinishedTable />
        </div>      
    </div>
</div>
</template>

<script>
import TotalsTable from '@/components/TotalsTable.vue'
import TotalsFinishedTable from '@/components/TotalsFinishedTable.vue'

export default {
  name: "GamesResume",
  components: {
    TotalsTable,
    TotalsFinishedTable
  },
  data(){
    return {
      
    }
  },
  setup() {

  },
  created() {
    
  }
};
</script>

<style scoped>

</style>