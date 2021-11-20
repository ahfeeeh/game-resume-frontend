<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Steam Games Table</h1>
    <div class="table-responsive">
        <SteamGamesTable />
    </div>    
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
