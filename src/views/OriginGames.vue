<template>
<div class="all-content">
  <Loading v-if="isLoading"></Loading>
  <div class="container py-4" v-if="!isLoading" style="margin-top:50px">
  <div class="row align-items-start">
      <button type="button" class="btn btn-primary btn-lg btn-block" @click="toggleModal">Add a new Game</button>
    </div>
  <div class="about">
    <h1>Origin Games Table</h1>
     <div class="row align-items-end"  style="margin-top:20px">
        <div class="col"></div>
        <div class="col"></div>
        <div class="col">
          <a type="button" class="btn btn-outline-primary" :href="`${env}/csv?table=Origin`">to CSV</a> &nbsp;
          <a type="button" class="btn btn-outline-secondary" :href="`${env}/pdf?from=origin`" target="_blank">to PDF</a> &nbsp;
          <a type="button" class="btn btn-outline-success" :href="`${env}/xls?from=origin`">to XLS</a>
        </div>
      </div>
    <div class="table-responsive">
      <OriginGamesTable />
    </div>    
    <Modal @close="toggleModal" :modalActive="modalActive">
        <template v-slot:modal-header>
            Add a New Game
        </template>      
        <template v-slot:modal-content>            
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">AppId</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="newItem.app_id">
            </div>
            
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">SystemId</span>
                </div>
                <input type="text" readonly class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="newItem.system_id">
            </div>

            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="newItem.title">
            </div>
            
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="newItem.finished">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Finished?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="newItem.collection">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Collection?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="newItem.genuine">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Genuine?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="newItem.fisical_disc">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Fisical Disc?">
            </div>

        </template>
        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="saveGame(newItem)">Save changes</button>
        </template>
    </Modal>
  </div>
</div>
</div>  

</template>

<script>
// @ is an alias to /src
import OriginGamesTable from '@/components/OriginGamesTable.vue'
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';

export default {
  name: 'OriginGames',
  components: {
    OriginGamesTable,
    Modal,
    Loading
  },
  setup() {
    const store = useStore();

    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

     const toast = useToast();

    return { modalActive, toggleModal, toast, store };
  },  
    mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  data() {
    return {
      env: process.env.VUE_APP_BACKEND_SERVER,  
      isLoading: true,     
      newItem: {app_id: "", system_id: 1, title: "", finished: null, collection: null, genuine: null, fisical_disc: null, table: 'origin'}      
    }
  },
  methods: {
    saveGame(payload) {  
      this.store.dispatch('saveGame', { payload, toast: this.toast, toggleModal: this.toggleModal })  
      this.newItem = {app_id: "", system_id: 1, title: "", finished: null, collection: null, genuine: null, fisical_disc: null, table: 'origin'}      
    }
  }
}
</script>
