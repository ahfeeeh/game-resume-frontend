<template>
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