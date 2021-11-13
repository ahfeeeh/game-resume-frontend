<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Games Resume</h1>
      <p class="col-md-8 fs-4">
        Using a series of utilities, you can create this jumbotron, just like
        the one in previous versions of Bootstrap. Check out the examples below
        for how you can remix and restyle it to your liking.
      </p>
      <button class="btn btn-primary btn-lg" type="button" @click="goToAllGames">
        See All Games
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goToAllGames() {
      this.$router.push({ path: "all_games" });
    }
  }
}
</script>

<style scoped>
</style>
