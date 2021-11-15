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
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="this.store.state.selectedItem.ID">
            </div>
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="this.store.state.selectedItem.NAME">
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="this.store.state.selectedItem.FINISHED">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Finished?">
            </div>

            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="this.store.state.selectedItem.FISICAL_DISC">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Fisical Disc?">
            </div>
        </template>
        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary">Save changes</button>
        </template>
    </Modal>  
</template>

<script>

import axios from 'axios';
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useStore } from 'vuex';

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
        // this.selectedItem = store.state.selectedItem
      }      
    };


      // https://github.com/Maronato/vue-toastification/tree/next
      // Get toast interface
      const toast = useToast();

      // Use it!
      // toast("I'm a toast!");

      // or with options
      /*toast.success("My toast content", {
        timeout: 4000
      });*/
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      // games_store: computed(() => store.state.games)
      return { toast, modalActive, toggleModal, store }
    },
  data() {
    return {
      games: [],
      selectedItem: {ID: "", NAME: "", FINISHED: null, FISICAL_DISC: null}      
    }
  },
  created() {
        
  },mounted() {
    this.getItems();
        // Since you returned `toast` from setup(), you can access it now
        // this.toast.info("I'm an info toast!");
        
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
      
      this.selectedItem = this.games[idx];      

      const payload = {
        table: "wiiu",
        title: this.selectedItem.NAME,
        finished: !this.selectedItem.FINISHED
        }      
      
      axios.post('http://localhost:4000/finished', payload).then((resp)=>{
        if(resp){
          this.getItems();
          this.toast.success(`Success on Mark ${this.selectedItem.NAME} as ${!this.selectedItem.FINISHED ? 'Finished': 'Unfinished'} `)
        }         
      }).catch((rej) => {
      console.log(rej)
        this.toast.error("Error on Save Changes on API");
    }); 

    },
    deleteItem(idx) {

      this.selectedItem = this.games[idx];      

      const payload = {
        table: "wiiu",
        title: this.selectedItem.NAME        
        }    

      axios.delete('http://localhost:4000/remove', { data: payload }).then((resp)=>{        
        if(resp){
          this.getItems();
          this.toast.success(`Success on Remove ${this.selectedItem.NAME} from Database`)
        }         
      }).catch((rej) => {        
      console.log(rej)
        this.toast.error("Error on Remove Data API");
    }); 



    }
  },
  components: {
    Modal  
  }  
}
</script>

<style scoped>

</style>