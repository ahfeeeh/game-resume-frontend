<template>
<div class="all-content">
  <Loading v-if="isLoading"></Loading>
  <div class="container py-4" v-if="!isLoading" style="margin-top:50px">
  <div class="about">
    <h1>Steam Games Table</h1>
    <div class="table-responsive">
        <SteamGamesTable />
    </div>    
  </div>
</div>
</div>  

</template>

<script>
// @ is an alias to /src
import SteamGamesTable from '@/components/SteamGamesTable.vue'
import Loading from "@/components/Loading.vue";

export default {
  name: 'SteamGames',
  components: {
    SteamGamesTable,
    Loading
  },  
    mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  data() {
    return {  
      isLoading: true    
    }
  },
}
</script>
