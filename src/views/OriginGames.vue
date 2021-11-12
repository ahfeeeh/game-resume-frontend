<template>
<div class="container">
  <div class="about">
    <h1>Origin Games Table</h1>
    <OriginGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import OriginGamesTable from '@/components/OriginGamesTable.vue'

export default {
  name: 'OriginGames',
  components: {
    OriginGamesTable
  }
}
</script>
