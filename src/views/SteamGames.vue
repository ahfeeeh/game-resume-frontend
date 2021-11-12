<template>
<div class="container">
  <div class="about">
    <h1>Steam Games Table</h1>
    <SteamGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import SteamGamesTable from '@/components/SteamGamesTable.vue'

export default {
  name: 'SteamGames',
  components: {
    SteamGamesTable
  }
}
</script>
