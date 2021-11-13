<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Console Games Table</h1>
    <ConsoleGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import ConsoleGamesTable from '@/components/ConsoleGamesTable.vue'

export default {
  name: 'ConsoleGames',
  components: {
    ConsoleGamesTable
  }
}
</script>
