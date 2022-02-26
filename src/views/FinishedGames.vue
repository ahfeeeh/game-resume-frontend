<template>
  <div class="nav-scroller bg-body shadow-sm" style="margin-top: 60px">
    <nav class="nav nav-underline" aria-label="Secondary navigation">
      <a
        class="nav-link active"
        aria-current="page"
        @click="allFinishedGames"
        style="cursor: pointer"
        >Normal List</a
      >
      <a
        class="nav-link"
        @click="allFinishedGamesDetailed"
        style="cursor: pointer"
        >Detailed List</a
      >
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          PC Games
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('Origin')"
          >Origin</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('Steam')"
          >Steam</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('Ubisoft')"
          >Ubisoft</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Console Games
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('GameCube')"
          >GameCube</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('Wii')"
          >Wii</a>
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allFinishedGamesBySystem('WiiU')"
            >WiiU</a
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"
          @click="allFinishedGamesBySystem('VC')"
          >Virtual Console</a>
        </div>
      </li>
    </nav>
  </div>
  <div class="container py-4" style="margin-top: 10px">
    <div class="about">
      <h1>Finished Games Table</h1>
      <FinishedGamesTable :games="this.games" />
    </div>
  </div>
</template>

<script>
import FinishedGamesTable from "@/components/FinishedGamesTable.vue";
import { request, gql } from "graphql-request";

const queryAllFinished = gql`
  {
    games: allGamesFinished {
      title
      system
      finished
    }
  }
`;

const queryAllFinishedDetailed = gql`
  {
    games: allGamesFinishedDetailed {
      title
      system
      finished
    }
  }
`;

const queryFilterBySystem = gql`
  query getGamesFinishedBySystem($system: String!) {
    games: getFinishedBySystem(system: $system) {
      title
      system
      finished
    }
  }
`;

export default {
  components: {
    FinishedGamesTable,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    allFinishedGames() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllFinished).then(
        (data) => {
          vm.games = data.games;
        }
      );
    },
    allFinishedGamesDetailed() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllFinishedDetailed).then(
        (data) => {
          vm.games = data.games;
        }
      );
    },
    allFinishedGamesBySystem(system) {
      const vm = this;
      request("http://localhost:4000/graphql", queryFilterBySystem, {
        system,
      }).then((data) => {
        vm.games = data.games;
      });
    },
  },
  created() {
    this.allFinishedGames();
  },
};
</script>

<style>
</style>