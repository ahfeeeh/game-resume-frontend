<template>
  <div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Trash Table</h1>
    <TrashTable />
  </div>
</div>
</template>

<script>
import TrashTable from '@/components/TrashTable.vue'
export default {
    name: "Trash",
    components:{
        TrashTable
    }
}
</script>

<style>

</style>