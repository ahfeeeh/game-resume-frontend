<template>
<div class="container py-4" style="margin-top:50px">
    <div class="row align-items-start">
      <button type="button" class="btn btn-primary btn-lg btn-block">Add a new Game</button>
    </div>
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
