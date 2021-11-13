<template>
<div class="container py-4" style="margin-top:50px">
  <div class="about">
    <h1>Ubisoft Games Table</h1>
    <UbisoftGamesTable />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import UbisoftGamesTable from '@/components/UbisoftGamesTable.vue'

export default {
  name: 'UbisoftGames',
  components: {
    UbisoftGamesTable
  }
}
</script>
