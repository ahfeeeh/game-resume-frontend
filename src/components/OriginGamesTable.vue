<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Id</th>
        <th>AppId</th>
        <th>Title</th>        
        <th>Finished ?</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in getGames" :key="idx">
        <td>{{game.id }}</td>
        <td>{{game.app_id }}</td>
        <td>{{game.title}}</td>            
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>        
        <td>
          <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-danger btn-sm" @click="markAsPlaying(idx, getSelectedGame)"><i class="fas fa-play"></i> Mark as Playing</button> &nbsp;
              <button type="button" class="btn btn-success btn-sm" @click="toggleModalFinished(idx)"><i class="fas fa-check"></i> Mark as Finished</button> &nbsp;
              <button type="button" class="btn btn-primary btn-sm" @click="toggleModal(idx)"><i class="fas fa-edit"></i> Edit</button> &nbsp;
              <button type="button" class="btn btn-secondary btn-sm" @click="toggleModalDelete(idx)"><i class="fas fa-trash-alt"></i> Delete</button>
          </div>          
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
                    <span class="input-group-text" id="basic-addon3" >AppId</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.app_id">
            </div>
            <div class="input-group mb-3  input-group-md">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Title</span>
                </div>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="getSelectedGame.title">
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" v-model="getSelectedGame.finished">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox" readonly placeholder="Finished?">
            </div>
        </template>
        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="editItem(getSelectedGame)">Save changes</button>
        </template>
    </Modal>
    <Modal @close="toggleModalDelete" :modalActive="modalActiveDelete">
        <template v-slot:modal-header>
            Delete a Game
        </template>
      
       
        <template v-slot:modal-content>            
            <h2>Are you sure you want to remove this game?</h2>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="deleteItem(getCurrentIdx, toggleModalDelete)">Delete Game</button>
        </template>
    </Modal>
        <Modal @close="toggleModalFinished" :modalActive="modalActiveFinished">
        <template v-slot:modal-header>
            Mark Game as Finished
        </template>
      
       
        <template v-slot:modal-content>            
            <h2>Are you sure you want to mark this game as finished?</h2>
        </template>
      

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="finishItem(getCurrentIdx, toggleModalFinished)">Mark as Finished</button>
        </template>
    </Modal>  
</template>

<script>
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';


export default {
  name: 'OriginGamesTable',
  setup() {

    const store = useStore();    

    const modalActive = ref(false);
    const modalActiveDelete = ref(false);
    const modalActiveFinished = ref(false);

    const toggleModal = (idx) => {
      modalActive.value = !modalActive.value;
      if(modalActive.value){
        console.log(idx)    
        store.commit("SELECT_ITEM", idx);        
      }      
    };

     const toggleModalDelete = (idx) => {
      modalActiveDelete.value = !modalActiveDelete.value;      
      if(modalActiveDelete.value){
        console.log('are you sure Delete ? ', idx)
        store.commit("SELECT_ITEM", idx);        
      } 
    };

    const toggleModalFinished = (idx) => {
      modalActiveFinished.value = !modalActiveFinished.value;      
       if(modalActiveFinished.value){
        console.log('are you sure Finished ? ', idx)
        store.commit("SELECT_ITEM", idx);        
      } 
    };
     
      const toast = useToast();

      return { toast, 
      modalActive, toggleModal, 
      modalActiveDelete,modalActiveFinished, 
      toggleModalDelete,toggleModalFinished, store }
    },  
  data() { return {} },
  computed: mapGetters(['getGames', 'getSelectedGame', 'getCurrentIdx']),
  created() {},
  mounted() {
    this.getItems();        
  }, 
  methods: {
    getItems(){
      this.store.dispatch('getGames', { payload:{table: 'origin'}, toast: this.toast })
    },
    finishItem(idx, toggleModal) {            
      this.store.dispatch('finishGame', { payload:{idx, table: 'origin'}, toast: this.toast })
      toggleModal();   
    },
    deleteItem(idx, toggleModal) {
      this.store.dispatch('deleteGame', { payload:{idx, table: 'origin'}, toast: this.toast })  
      toggleModal();  
    },
    editItem(payload) {
      payload.table = 'origin'
      this.store.dispatch('updateGame', { payload, toast: this.toast, toggleModal: this.toggleModal })  
    },
    markAsPlaying(idx, payload) {           
      payload.table = 'playing'
      payload.idx = idx      
      this.store.dispatch('markAsPlaying', { payload, toast: this.toast })  
    }
  },
  components: {
    Modal  
  }      
}
</script>

<style scoped>

</style>