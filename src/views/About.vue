<template>
<div class="container">
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
  name: 'Home',
  components: {
    AllGamesTable
  }
}
</script>
