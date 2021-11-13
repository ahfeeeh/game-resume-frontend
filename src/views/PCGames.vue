<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>PC Games Table</h1>
    <PCGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import PCGamesTable from '@/components/PCGamesTable.vue'

export default {
  name: 'PCGames',
  components: {
    PCGamesTable
  }
}
</script>
