<template>
  <div class="container py-4" style="margin-top: 50px">
    <div class="import">
      <h1>Import</h1>

      <a href="http://localhost:4000/load_games_empty.xlsx"> Download Import Sheet </a>

      <form @submit.prevent>
      <label for="formFile" class="form-label">Import Games from XLSX</label>
      <input type="file" name="sheet" id="sheet" class="form-control" accept=".xlsx"/>
      <p style="margin-top: 30px;">
        <button class="btn btn-primary" type="submit" @click="sendFile">Send</button>&nbsp;
        <button class="btn btn-secondary" type="submit" variant="success" @click="sendFileAndDownload">Send And Download</button>&nbsp;
        <a class="btn btn-success" href="#end" v-if="games.length > 20">Go to end</a>
      </p>
      
    </form>    
    <table class="table table-striped table-hover" v-if="games.length > 0">
      <thead>
        <tr>
          <th>AppId</th>
          <th>SystemId</th>
          <th>Title</th>          
          <th>Finished?</th>          
          <th>Finished At</th>  
          <th>Genuine?</th>          
          <th>Collection?</th>          
          <th>Fisical Disc?</th>                  
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, idx) in games" :key="idx">
          <td>{{ game.app_id }}</td>
          <td>{{ game.system_id }}</td>
          <td>{{ game.title }}</td>          
          <td>{{ game.finished }}</td>          
          <td>{{ game.finished_at }}</td>          
          <td>{{ game.genuine }}</td>          
          <td>{{ game.collection }}</td>          
          <td>{{ game.fisical_disc }}</td>          
        </tr>
      </tbody>
      <tfoot id="end">
          <tr>            
            <td><button class="btn btn-primary btn-sm" type="submit" @click="importData">Import Data</button></td>
            <td><button class="btn btn-danger btn-sm" type="submit" @click="cancel">Cancel</button></td>
          </tr>
      </tfoot>    
    </table>
  

  </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from 'axios';

export default {
  name: "Import",
  components: {
    
  },
  setup() {  
    const toast = useToast();  
    return {toast}
  },
  data() {
    return{
    file: null,
    games: [],
    };
  },
  async created(){
      
  },
  methods: {    
      cancel()  {
          this.file = null;
          this.games = []
      },
      sendFile() {
      const formData = new FormData();
      const file = document.querySelector("#sheet");
      formData.append("sheet", file.files[0]);

      axios
        .post("http://localhost:4000/load_games", formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((data) => {          
          this.games = data.data.games;
        });
    },
    sendFileAndDownload() {
      const formData = new FormData();
      const file = document.querySelector("#sheet");
      formData.append("sheet", file.files[0]);

      axios(
        {
          url: "http://localhost:4000/load_games", //your url
          method: "POST",
          responseType: "blob", // important
          data: formData,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          }
        }        
      ).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "games.json"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    async importData(){
        const response = await axios.post('http://localhost:4000/import_data', {games: this.games})
        if (response.data.success) {
            this.toast.success(`Success on import Data to Database`)
            this.file = null;
            this.games = []
        } else {
            this.toast.error("Error on Import Data API");
        }
    }
  }
};
</script>

<style>

</style>