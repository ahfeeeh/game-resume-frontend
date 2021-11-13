<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Wii Games Table</h1>
    <WiiGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import WiiGamesTable from '@/components/WiiGamesTable.vue'

export default {
  name: 'WiiGames',
  components: {
    WiiGamesTable
  }
}
</script>
