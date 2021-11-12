<template>
  <div class="h-100 p-5 bg-light border rounded-3">
    <h2>Console Games</h2>
    <p>
      Or, keep it light and add a border for some added definition to the
      boundaries of your content. Be sure to look under the hood at the source
      HTML here as we've adjusted the alignment and sizing of both column's
      content for equal-height.
    </p>
    <button class="btn btn-outline-secondary" type="button" @click="goToConsoleGames">
      See Console Games
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToConsoleGames() {
      this.$router.push({ path: 'console' })
    }
  }
}
</script>

<style scoped>

</style>