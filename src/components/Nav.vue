<template>  

  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
    aria-label="Main navigation">
    <div class="container-fluid">      
      <router-link to="/" class="navbar-brand">My Games Resume</router-link>
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
            <router-link to="/" class="nav-link">Home</router-link>
          </li>          

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Stats
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link to="/resume" class="dropdown-item">Resume</router-link></li>   
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/charts" class="dropdown-item">Charts</router-link></li>                 
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/genres" class="dropdown-item">Genres</router-link></li>                 
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/finished_over_system" class="dropdown-item">Finished Stats</router-link></li>                 
            </ul>
          </li>
        

          <li class="nav-item">
            <router-link to="/tobuy" class="nav-link">To Buy Games</router-link>            
          </li>   

          <li class="nav-item">
            <router-link to="/dlcs" class="nav-link">DLC Games</router-link>            
          </li>   


          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              PC Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link to="/origin" class="dropdown-item">Origin Games</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/steam" class="dropdown-item">Steam Games</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/ubisoft" class="dropdown-item">Ubisoft Games</router-link></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Console Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link to="/gamecube" class="dropdown-item">GameCube Games</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/wii" class="dropdown-item">Wii Games</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/wiiu" class="dropdown-item">WiiU Games</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link to="/virtualconsole" class="dropdown-item">Virtual Console Games</router-link></li>
            </ul>
          </li>
          
             <li class="nav-item">
               <router-link to="/gamesbygenres" class="nav-link">Games By Genre</router-link>               
            </li>  
          
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            v-model="query"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-success"
            @click.stop.prevent="gotoSearch(query)"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  created(){
    this.query = this.$route.params.query;
    console.log(this.$route)
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
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
    goToGameCubeGames() {
      this.$router.push({ path: "gamecube" });
    },
    goToWiiUGames() {
      this.$router.push({ path: "wiiu" });
    },
    goToDLCGames() {
      this.$router.push({ path: "dlcs" });
    },
    gotoSearch(searchParam) {
      if (searchParam) {
        this.$router.push({ name: "Search", params: { query: searchParam } });
      }
    },
    goToResume() {
      this.$router.push({ path: "resume" });
    },
    goToGenres() {
      this.$router.push({ path: "genres" });
    },
    goToToBuyGames(){
      this.$router.push({ path: "tobuy" });
    },
    goToVirtualConsoleGames(){
      this.$router.push({ path: "virtualconsole" });
    },
    goToCharts(){
      this.$router.push({ path: "charts" });
    },
    goToGamesByGenre(){
      this.$router.push({ path: "gamesbygenres" });
    }
  },
  mounted() {
    document
      .querySelector("#navbarSideCollapse")
      .addEventListener("click", function () {
        document.querySelector(".offcanvas-collapse").classList.toggle("open");
      });
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