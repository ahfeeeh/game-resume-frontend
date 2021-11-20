<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>AppID</th>
        <th>Title</th>
        <th>Finished ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(game, idx) in getGames" :key="idx">
        <td>{{ game.idx }}</td>
        <td>{{ game.appid }}</td>
        <td>{{ game.title }}</td>
        <td>
          <input type="checkbox" v-model="game.finished" :disabled="true" />
        </td>
        <td>
          <div class="btn-group btn-group-sm" role="group">
            <button
              type="button"
              class="btn btn-success btn-sm"
              @click="toggleModalFinished(idx)"
            >
              <i class="fas fa-check"></i> Mark as Finished
            </button>
            &nbsp;
            <button
              type="button"
              class="btn btn-info btn-sm"
              style="color: white"
              @click="toggleModalDLC(game.appid, this)"
            >
              <i class="fa fa-puzzle-piece"></i> DLC
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Modal @close="toggleModalFinished" :modalActive="modalActiveFinished">
    <template v-slot:modal-header> Mark Game as Finished </template>

    <template v-slot:modal-content>
      <h2>Are you sure you want to mark this game as finished?</h2>
    </template>

    <template v-slot:modal-footer>
      <button
        type="button"
        class="btn btn-primary"
        @click="finishItem(getCurrentIdx, toggleModalFinished)"
      >
        Mark as Finished
      </button>
    </template>
  </Modal>
  <Modal @close="toggleModalDLC(-1, this)" :modalActive="modalActiveDLC">
    <template v-slot:modal-header> DLC </template>

    <template v-slot:modal-content>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Idx</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Finished</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dlc in dlcs" :key="dlc.idx">
            <th scope="row">{{ dlc.idx }}</th>
            <td>{{ dlc.id }}</td>
            <td>{{ dlc.title }}</td>
            <td>
              <input type="checkbox" v-model="dlc.finished" :disabled="true" />
            </td>
            <td>
              <button
                type="button"
                class="btn btn-success btn-sm"
                @click="markDlcAsFinished(dlc.idx, dlc.id, !dlc.finished, this)"
              >
                <i class="fas fa-check"></i> Mark as Finished
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-slot:modal-footer> </template>
  </Modal>
</template>

<script>
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";

import { useStore } from "vuex";
import { mapGetters } from "vuex";
import { ref } from "vue";
import { request, gql } from "graphql-request";
import axios from "axios";

export default {
  name: "SteamGamesTable",
  setup() {
    const toast = useToast();
    const store = useStore();

    const modalActiveFinished = ref(false);
    const modalActiveDLC = ref(false);

    const toggleModalFinished = (idx) => {
      modalActiveFinished.value = !modalActiveFinished.value;
      if (modalActiveFinished.value) {
        console.log("are you sure Finished ? ", idx);
        store.commit("SELECT_ITEM", idx);
      }
    };

    const toggleModalDLC = (id, context) => {
      modalActiveDLC.value = !modalActiveDLC.value;
      if (modalActiveDLC.value) {
        console.log("show DLCs for ? ", id);

        const query = gql`
          {
            dlcs: getDLC(id: "${id}") {
              idx
              id
              title
              finished
            }
          }
        `;

        request("http://localhost:4000/graphql", query).then((data) => {
          context.dlcs = data.dlcs;
        });
      } else {
        context.dlcs = [];
      }
    };

    const markDlcAsFinished = (idx, id, finished, context) => {
      console.log("Mark dlc as finished idx: ", idx);
      console.log("id:", id);
      console.log("finished: ", finished);
      const api_payload = { id, idx, finished };
      axios
        .post("http://localhost:4000/dlc_finished", api_payload)
        .then((resp) => {
          context.dlcs = resp.data.dlcs;
          toast.success(`Success on Mark as Finished from Database`);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error on Save Changes on API");
        });
    };

    return { toast, modalActiveFinished, modalActiveDLC, toggleModalFinished, toggleModalDLC, markDlcAsFinished, store };
  },
  data() {
    return {
      dlcs: []
    };
  },
  computed: mapGetters(["getGames", "getSelectedGame", "getCurrentIdx"]),
  created() {},
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.store.dispatch("getGames", {
        payload: { table: "steam" },
        toast: this.toast,
      });
    },
    finishItem(idx, toggleModal) {
      this.store.dispatch("finishGame", {
        payload: { idx, table: "steam" },
        toast: this.toast,
      });
      toggleModal();
    },
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>
</style>