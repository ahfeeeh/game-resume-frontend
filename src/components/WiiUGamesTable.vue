<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>ID</th>
        <th>Title</th>
        <th>Finished ?</th>
        <th>Fisical Disc ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.ID}}</td>
        <td>{{game.NAME}}</td>      
        <td><input type="checkbox" v-model="game.FINISHED" :disabled=true></td>   
        <td><input type="checkbox" v-model="game.FISICAL_DISC" :disabled=true></td>
        <td>
          <button type="button" class="btn btn-success btn-sm" @click="finishItem(idx)"><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;
          <button type="button" class="btn btn-primary btn-sm" @click="toggleModal(idx)"><i class="fas fa-edit"></i> Edit</button> &nbsp;
          <button type="button" class="btn btn-secondary btn-sm" @click="deleteItem(idx)"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>
    </tbody>   
    </table>
  <Modal @close="toggleModal" :modalActive="modalActive">
        <template v-slot:modal-header>
            Edit Game
        </template>      
        <template v-slot:modal-content>            
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3" >ID</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.ID">
            </div>
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.NAME">
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.FINISHED">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Finished?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.FISICAL_DISC">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Fisical Disc?">
            </div>
        </template>
        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="editItem(getSelectedGame)">Save changes</button>
        </template>
    </Modal>  
</template>

<script>

import axios from 'axios';
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'WiiUGamesTable',
  setup() {

    const store = useStore();

    const modalActive = ref(false);

    const toggleModal = (idx) => {
      modalActive.value = !modalActive.value;
      if(modalActive.value){
        console.log(idx)    
        store.commit("SELECT_ITEM", idx);        
      }      
    };
     
      const toast = useToast();

      return { toast, modalActive, toggleModal, store }
    },
  data() {
    return {
      games: []      
    }
  },
  computed: mapGetters(['getGames', 'getSelectedGame']),
  created() {},
  mounted() {
    this.getItems();        
  }, 
  methods: {
    buttonClick(message) {
        this.toast.success(message, {
        timeout: 2000
      });
    },
    getItems(){
      axios.get('http://localhost:4000/wiiu').then((resp) =>{
      this.games = resp.data.games;
      this.store.commit("SAVE_GAMES", this.games);        
    }).catch((rej) => {
      console.log(rej)
        this.toast.error("Error on Loading API");
    }); 
    },
    finishItem(idx) {      
      this.store.commit('SELECT_ITEM', idx);      

      const payload = {
        table: "wiiu",
        title: this.getSelectedGame.NAME,
        finished: !this.getSelectedGame.FINISHED
        }      
      
      axios.post('http://localhost:4000/finished', payload).then((resp)=>{
        if(resp){
          this.getItems();
          this.toast.success(`Success on Mark ${this.getSelectedGame.NAME} as ${!this.getSelectedGame.FINISHED ? 'Finished': 'Unfinished'} `)
        }         
      }).catch((rej) => {
      console.log(rej)
        this.toast.error("Error on Save Changes on API");
    }); 

    },
    deleteItem(idx) {
      this.store.commit('SELECT_ITEM', idx);        

      const payload = {
        table: "wiiu",
        title: this.getSelectedGame.NAME        
        }    

      axios.delete('http://localhost:4000/remove', { data: payload }).then((resp)=>{        
        if(resp){
          this.getItems();
          this.toast.success(`Success on Remove ${this.getSelectedGame.NAME} from Database`)
        }         
      }).catch((rej) => {        
      console.log(rej)
        this.toast.error("Error on Remove Data API");
    }); 



    },editItem(payload) {
      // TODO send to Backend
      // TODO Dismiss Modal
      // TODO show Toast Messages
      console.log(payload);
    }
  },
  components: {
    Modal  
  }  
}
</script>

<style scoped>

</style>