<template>

  <br />
  <br />
  <br />
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">Search</span>
    </div>
    <input type="text" class="form-control" placeholder="Input Game Name" aria-label="Search" aria-describedby="basic-addon1" v-model="searchQuery">
  </div>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Id</th>
        <th>Image</th>
        <th>AppId</th>
        <th>Title</th>
        <th>Finished ?</th>
        <th>Genuine ?</th>
        <th>Collection ?</th>
        <th>Fisical Disc ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(game, idx) in resultQuery" :key="idx">
        <td>{{ game.id }}</td>
        <td><img :src="`http://localhost:4000/${game.app_id}.jpg`" class="img-fluid img-thumbnail"></td>
        <td>{{ game.app_id }}</td>
        <td>{{ game.title }}</td>
        <td> <input type="checkbox" v-model="game.finished" :disabled="true" /> </td>
        <td> <input type="checkbox" v-model="game.genuine" :disabled="true" /> </td>
        <td> <input type="checkbox" v-model="game.collection" :disabled="true" /> </td>
        <td>
          <input type="checkbox" v-model="game.fisical_disc" :disabled="true" />
        </td>
        <td>
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-danger btn-sm" @click="markAsPlaying(game.app_id || game.id, getSelectedGame)"><i class="fas fa-play"></i> Mark as Playing</button> &nbsp;
            <button type="button" class="btn btn-success btn-sm" @click="toggleModalFinished(game.app_id || game.id)" ><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;
            <button :disabled="!game.has_dlc" type="button" class="btn btn-info btn-sm" style="color: white" @click="toggleModalDLC(game.app_id, this)"><i class="fa fa-puzzle-piece"></i> DLC</button> &nbsp;
            <button type="button" class="btn btn-primary btn-sm" @click="toggleModal(game.app_id || game.id)"><i class="fas fa-edit"></i> Edit</button> &nbsp;
            <button type="button" class="btn btn-secondary btn-sm" @click="toggleModalDelete(game.app_id || game.id)"><i class="fas fa-trash-alt"></i> Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Modal @close="toggleModal" :modalActive="modalActive">
    <template v-slot:modal-header> Edit Game </template>
    <template v-slot:modal-content>
      <div class="input-group mb-3 input-group-md">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">ID</span>
        </div>
        <input readonly type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.id" />
      </div>

      <div class="input-group mb-3 input-group-md">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">AppId</span>
        </div>
        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.app_id" />
      </div>


        <div class="input-group mb-3  input-group-md">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon3" >SystemId</span>
              </div>
            <input type="text" readonly class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.system_id">
        </div>




      <div class="input-group mb-3 input-group-md">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">Title</span>
        </div>
        <input
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
          v-model="getSelectedGame.title"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input
              type="checkbox"
              aria-label="Checkbox for following text input"
              v-model="getSelectedGame.finished"
            />
          </div>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Text input with checkbox"
          readonly
          placeholder="Finished?"
        />
      </div>

                  
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.collection">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Collection?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.genuine">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Genuine?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.fisical_disc">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Fisical Disc?">
            </div>

    </template>
    <template v-slot:modal-footer>
      <button
        type="button"
        class="btn btn-primary"
        @click="editItem(getSelectedGame)"
      >
        Save changes
      </button>
    </template>
  </Modal>
  <Modal @close="toggleModalDelete" :modalActive="modalActiveDelete">
    <template v-slot:modal-header> Delete a Game </template>

    <template v-slot:modal-content>
      <h2>Are you sure you want to remove this game?</h2>
    </template>

    <template v-slot:modal-footer>
      <button
        type="button"
        class="btn btn-primary"
        @click="deleteItem(getCurrentIdx, toggleModalDelete)"
      >
        Delete Game
      </button>
    </template>
  </Modal>
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
  <Modal @close="toggleModalDLC('', this)" :modalActive="modalActiveDLC">
    <template v-slot:modal-header> DLC </template>

    <template v-slot:modal-content>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">AppId</th>
            <th scope="col">Title</th>
            <th scope="col">Finished</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dlc, idx in dlcs" :key="idx">
            <th scope="row">{{dlc.id}}</th>
            <td>{{dlc.app_id}}</td>
            <td>{{dlc.title}}</td>
            <td><input type="checkbox" v-model="dlc.finished" :disabled="true" /></td>            
            <td>
              <button
              type="button"
              class="btn btn-success btn-sm"
              @click="markDlcAsFinished(dlc.id, dlc.app_id, !dlc.finished, this)">
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
import { ref } from "vue";
import { useStore } from "vuex";
import { mapGetters } from "vuex";
import { request, gql } from "graphql-request";
import axios from 'axios';

export default {
  name: "WiiUGamesTable",
  setup() {
    const store = useStore();
    const toast = useToast();

    const modalActive = ref(false);
    const modalActiveDelete = ref(false);
    const modalActiveFinished = ref(false);
    const modalActiveDLC = ref(false);

    const toggleModal = (idx) => {
      modalActive.value = !modalActive.value;
      if (modalActive.value) {
        console.log(idx);
        store.commit("SELECT_ITEM", idx);
      }
    };

    const toggleModalDelete = (idx) => {
      modalActiveDelete.value = !modalActiveDelete.value;
      if (modalActiveDelete.value) {
        console.log("are you sure Delete ? ", idx);
        store.commit("SELECT_ITEM", idx);
      }
    };

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
            dlcs: getDLC(app_id: "${id}") {
              id
              app_id
              title
              finished
            }
          }
        `;        

        request("http://localhost:4000/graphql", query).then((data) => {                    
          context.dlcs = data.dlcs;          
        });
      } else{
        context.dlcs = []
      }
    };
    
    const markDlcAsFinished = (idx, id, finished, context) => {
      console.log("Mark dlc as finished idx: ",idx)
      console.log("id:", idx)
      console.log("appid:", id)
      console.log("finished: ", finished)
      const api_payload = {app_id: id, id: idx, finished}
      axios.post('http://localhost:4000/dlc_finished', api_payload)
        .then(resp=> {          
          context.dlcs = resp.data.dlcs
          toast.success(`Success on Mark as Finished from Database`)
        })
        .catch(err=>{
          console.error(err)
          toast.error("Error on Save Changes on API");
        })
    }   

    return {
      toast,
      modalActive,
      modalActiveDelete,
      modalActiveFinished,
      modalActiveDLC,
      toggleModal,
      toggleModalDelete,
      toggleModalDLC,
      toggleModalFinished,
      markDlcAsFinished,
      store,
    };
  },
  data() {
    return {
      searchQuery: null,
      dlcs: [],
    };
  },
  computed: {resultQuery() {
    if(this.searchQuery){      
      return this.getGames.filter((item)=>{        
        return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.getGames;
      }
  },
  ...mapGetters(["getGames", "getSelectedGame", "getCurrentIdx"])},
  created() {},
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.store.dispatch("getGames", {
        payload: { table: "wiiu" },
        toast: this.toast,
      });
    },
    finishItem(idx, toggleModal) {
      this.store.dispatch("finishGame", {
        payload: { idx:idx[0], table: "wiiu" },
        toast: this.toast,
      });
      toggleModal();
    },
    deleteItem(idx, toggleModal) {
      this.store.dispatch("deleteGame", {
        payload: { idx:idx[0], table: "wiiu" },
        toast: this.toast,
      });
      toggleModal();
    },
    editItem(payload) {
      payload.table = "wiiu";
      this.store.dispatch("updateGame", {
        payload,
        toast: this.toast,
        toggleModal: this.toggleModal,
      });
    },    
    markAsPlaying(idx, payload) {           
      payload.table = 'playing'
      payload.idx = idx      
      this.store.dispatch('markAsPlaying', { payload, toast: this.toast })  
    }
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>
.table-image td, .table-image th {
  vertical-align: middle;
}
 
</style>