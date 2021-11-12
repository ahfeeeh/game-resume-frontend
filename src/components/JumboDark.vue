<template>
  <div class="h-100 p-5 text-white bg-dark rounded-3">
    <h2>PC Games</h2>
    <p>
      Swap the background-color utility and add a `.text-*` color utility to mix
      up the jumbotron look. Then, mix and match with additional component
      themes and more.
    </p>
    <button class="btn btn-outline-light" type="button" @click="goToPCGames">See PC Games</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToPCGames() {
      this.$router.push({ path: 'pc' })
    }
  }
}
</script>

<style scoped>
</style>
