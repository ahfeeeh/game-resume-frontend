<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>All Games Table</h1>
    <AllGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import AllGamesTable from '@/components/AllGamesTable.vue'

export default {
  name: 'AllGames',
  components: {
    AllGamesTable
  }
}
</script>
