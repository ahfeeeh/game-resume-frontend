<template>
  <div id="loading">
    <img
      class="img"
      src="../assets/images/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 0%;
}
</style>