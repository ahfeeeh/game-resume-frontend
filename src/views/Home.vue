<template>
  <div class="nav-scroller bg-body shadow-sm" style="margin-top: 60px">
        <nav class="nav nav-underline" aria-label="Secondary navigation">
          <a class="nav-link active" aria-current="page" @click="goToAllGames" style="cursor:pointer">All Games</a>          
          <a class="nav-link" @click="goToPCGames" style="cursor:pointer">PC Games</a>
          <a class="nav-link" @click="goToConsoleGames" style="cursor:pointer">Console Games</a>
          <a class="nav-link" @click="goToPlayingGames" style="cursor:pointer">Playing</a>          
        </nav>
  </div>
  <div class="container py-4">
    <div class="home">      
      <JumboTron />
       <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <JumboDark />
          </div>
          <div class="col-md-6">
            <JumboClear />
          </div>
    </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import JumboTron from "@/components/JumboTron.vue";
import JumboDark from "@/components/JumboDark.vue";
import JumboClear from "@/components/JumboClear.vue";

export default {
  name: "Home",
  components: {
    JumboTron,
    JumboDark,
    JumboClear
  },
  methods:{
    goToAllGames() {
      this.$router.push({ path: "all_games" });
    },
    goToPCGames() {
      this.$router.push({ path: 'pc' })
    },
    goToConsoleGames() {
      this.$router.push({ path: 'console' })
    },
    goToPlayingGames() {
      this.$router.push({ path: 'playing' })
    }
  }
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>