<template>
  <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/all_games">All Games</router-link> |
        <router-link to="/origin">Origin Games</router-link> |
        <router-link to="/ubisoft">Ubisoft Games</router-link> |
        <router-link to="/steam">Steam Games</router-link> |
        <router-link to="/wii">Wii Games</router-link> |
        <router-link to="/wiiu">WiiU Games</router-link> 
    </div> -->

  <nav
    class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
    aria-label="Main navigation">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">My Games Resume</a>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        id="navbarSideCollapse"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="navbar-collapse offcanvas-collapse"
        id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="#"
              @click="goToHome">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToAllGames">All Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToOriginGames">Origin Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToUbisoftGames">Ubisoft Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToSteamGames">Steam Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToWiiGames">Wii Games</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="goToWiiUGames">WiiU Games</a>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
    },
    goToAllGames() {
      this.$router.push({ path: "all_games" });
    },
    goToOriginGames() {
      this.$router.push({ path: "origin" });
    },
    goToUbisoftGames() {
      this.$router.push({ path: "ubisoft" });
    },
    goToSteamGames() {
      this.$router.push({ path: "steam" });
    },
    goToWiiGames() {
      this.$router.push({ path: "wii" });
    },
    goToWiiUGames() {
      this.$router.push({ path: "wiiu" });
    },
  },
  mounted() {    
      document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
      document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
  },
};
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

html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 56px;
}

@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: #343a40;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
  .offcanvas-collapse.open {
    visibility: visible;
    transform: translateX(-100%);
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.nav-underline .nav-link:hover {
  color: #007bff;
}

.nav-underline .active {
  font-weight: 500;
  color: #343a40;
}

.bg-purple {
  background-color: #6f42c1;
}
</style>