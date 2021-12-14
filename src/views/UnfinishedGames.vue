<template>
  <div class="nav-scroller bg-body shadow-sm" style="margin-top: 60px">
    <nav class="nav nav-underline" aria-label="Secondary navigation">
      <a
        class="nav-link active"
        aria-current="page"
        @click="allUnfinishedGames"
        style="cursor: pointer"
        >Normal List</a
      >
      <a
        class="nav-link"
        @click="allUnfinishedGamesDetailed"
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
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('Origin')"
            >Origin</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('Steam')"
            >Steam</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('Ubisoft')"
            >Ubisoft</a
          >
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
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('GameCube')"
            >GameCube</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('Wii')"
            >Wii</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('WiiU')"
            >WiiU</a
          >
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            @click="allUnfinishedGamesBySystem('Virtual Console')"
            >Virtual Console</a
          >
        </div>
      </li>
    </nav>
  </div>
  <div class="container py-4" style="margin-top: 10px">
    <div class="about">
      <h1>Unfinished Games Table</h1>
      <FinishedGamesTable :games="this.games" />
    </div>
  </div>
</template>

<script>
import FinishedGamesTable from "@/components/FinishedGamesTable.vue";
import { request, gql } from "graphql-request";

const queryAllUnfinished = gql`
  {
    games: allGamesUnfinished {
      title
      system
      finished
    }
  }
`;

const queryAllUnfinishedDetailed = gql`
  {
    games: allGamesUnfinishedDetailed {
      title
      system
      finished
    }
  }
`;

const queryFilterBySystem = gql`
  query getGamesUnfinishedBySystem($system: String!) {
    games: getUnfinishedBySystem(system: $system) {
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
    allUnfinishedGames() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllUnfinished).then(
        (data) => {
          vm.games = data.games;
        }
      );
    },
    allUnfinishedGamesDetailed() {
      const vm = this;
      request("http://localhost:4000/graphql", queryAllUnfinishedDetailed).then(
        (data) => {
          vm.games = data.games;
        }
      );
    },
    allUnfinishedGamesBySystem(system) {
      const vm = this;
      request("http://localhost:4000/graphql", queryFilterBySystem, {
        system,
      }).then((data) => {
        vm.games = data.games;
      });
    },
  },
  created() {
    this.allUnfinishedGames();
  },
};
</script>

<style>
</style>