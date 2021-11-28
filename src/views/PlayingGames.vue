<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Playing Games Table</h1>
    <PlayingGamesTable />
  </div>
</div>
</template>

<script>
import PlayingGamesTable from '@/components/PlayingGamesTable.vue'
export default {
name: 'PlayingGames',
  components: {
    PlayingGamesTable
  }
}
</script>

<style>

</style>