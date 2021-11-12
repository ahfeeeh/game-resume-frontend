<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/all_games">All Games</router-link> |
        <router-link to="/origin">Origin Games</router-link> |
        <router-link to="/ubisoft">Ubisoft Games</router-link> |
        <router-link to="/steam">Steam Games</router-link> |
        <router-link to="/wii">Wii Games</router-link> |
        <router-link to="/wiiu">WiiU Games</router-link> 
    </div>
</template>

<script>

</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>