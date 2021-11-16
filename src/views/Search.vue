<template>
  <div class="container py-4" style="margin-top:50px">
      <div class="about">
          <h1>Search Page</h1>
          <p>{{ query }}</p>
      </div>          
  </div>
</template>

<script>
export default {
 name: "Search Page",
 props: ['query'],
 data(){
     return {
         route: this.$route.params
     }
 },
 watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from)
      this.route = to.params.query
    }
  }
}
</script>

<style>

</style>