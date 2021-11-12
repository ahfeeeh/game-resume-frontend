<template>
<div class="container">
  <div class="about">
    <h1>WiiU Games Table</h1>
    <WiiUGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import WiiUGamesTable from '@/components/WiiUGamesTable.vue'

export default {
  name: 'WiiUGames',
  components: {
    WiiUGamesTable
  }
}
</script>
