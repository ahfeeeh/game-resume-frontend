<template>
  <div class="container py-4" style="margin-top: 50px">
    <div class="codes">
      <h1>Codes</h1>
      
      <h3>Select a game</h3>
      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">AppId</span>
        </div>
          <input type="text" v-model="app_id" class="form-control" placeholder="AppId" aria-label="AppId" aria-describedby="basic-addon1" />
          <button :disabled="app_id.length < 3" type="button" class="btn btn-primary" @click="getGameByAppId">Find</button>
      </div>      

      <div v-if="game && content"> 
          <h3>Tips and Cheats</h3>
            {{game ? 'for ' + game.title : null}}
            <br />
            <br />
          <div v-html="content"></div>
          <button type="button" class="btn btn-primary" @click="toggleModal">Edit Code</button>      
      </div>        

      <div v-else-if="game">
        <h3>Tips and Cheats</h3>
            {{game ? 'for ' + game.title : null}}
            <br />
            <br />
          <div v-html="content"></div>
          <button type="button" class="btn btn-primary" @click="toggleModal">Create Code</button>      
      </div>

      <div v-else>
          <h3 v-if="app_id">Game not found</h3>      
      </div>            
           
    </div>
    <Modal @close="toggleModal" :modalActive="modalActive">
        <template v-slot:modal-header>
            Edit Code
        </template>      
        
        <template v-slot:modal-content>        
            <div class="input-group mb-3  input-group-md" v-if="id">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Id</span>
                </div>
                <input readonly type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="id">
            </div>

            <quill-editor
            theme="snow" toolbar="full"  
            :content="content" :contentType="'html'"
            v-model:content="content"       
            v-if="content"></quill-editor>   

            <quill-editor
            theme="snow" toolbar="full"  
            :content="content" :contentType="'html'"
            v-model:content="content"       
            v-if="!content"></quill-editor>   
        </template>

        <template v-slot:modal-footer>
            <button type="button" class="btn btn-primary" @click="createCodeAndTip">Save changes</button>
        </template>
    </Modal>
  </div>
</template>

<script>
import {ref} from 'vue';
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import Modal from "@/components/Modal.vue";
import axios from 'axios';

export default {
  components: {
    QuillEditor,  
    Modal,  
  },
  setup() {
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return {modalActive, toggleModal}
  },
  data() {
    return { id: null, content: "", games: [], app_id: "", game: null, quillOptions: {
          placeholder: 'Digite uma frase para personalizar',
          readonly: false,
          scrollingContainer: '.scroll-container'
      } };
  },
  async created(){
      
  },
  methods: {      
      async getGames(){
         const response = await axios.get(`http://localhost:4000/search?query=${this.query}`);
         this.games = response.data.games;        
      },
      async getGameByAppId(){
        this.id = null;
        this.content = null;
        const response = await axios.get(`http://localhost:4000/game/${this.app_id}`);          
        this.game = response.data.game;
        this.game ? await this.getCode(this.app_id) : this.content = null
      },
      async getCode(app_id){
          const response = await axios.get(`http://localhost:4000/game/${app_id}/codes`);            
          
          if (response.data && response.data.code){
            this.id = response.data.code.id;
            this.content = response.data.code.content;   
          }
      },
      async createCodeAndTip(){
          if(this.id) {
            const response = await axios.put('http://localhost:4000/code', {id: this.id, app_id: this.app_id, content: this.content})          
            this.content = response.data.code.content;
            this.app_id = response.data.code.app_id;
            this.id = response.data.code.id;
          } else {
            const response = await axios.post('http://localhost:4000/code', {app_id: this.app_id,content: this.content})          
            this.content = response.data.code.content;
            this.app_id = response.data.code.app_id;
            this.id = response.data.code.id;
          }
          this.toggleModal();
          
      }
  }
};
</script>

<style>
.ql-clipboard {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 0px; 
}
.scroll-container {
  overflow: auto;
  background-color: beige;
  height: 180px;
}
</style>