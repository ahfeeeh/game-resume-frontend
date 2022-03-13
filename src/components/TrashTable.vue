<template>
  <table class="table table-striped table-hover" v-if="trash.length > 0">
    <thead>
      <tr>
        <th>Id</th>
        <th>Table Name</th>
        <th>Data</th>
        <th>Deleted At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in trash" :key="idx">
        <td>{{ item.id }}</td>
        <td>{{ item.table_name }}</td>
        <td>{{  item.data}}</td>
        <td>{{ item.deleted_at }}</td>        
        <td>
          <div class="btn-group btn-group-sm" role="group">            
            <button type="button" class="btn btn-success btn-sm" @click="restoreItem(item.id)" > <i class="fa fa-undo" aria-hidden="true"></i> Restore Item</button> &nbsp;            
            <button type="button" class="btn btn-danger btn-sm" @click="deleteItem(item.id)" > <i class="fas fa-trash"></i> Delete Item</button> &nbsp;                        
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <h1 v-else>Empty</h1>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from "axios";

export default {
    name: "TrashTable",
    data(){
        return {trash: []}
    },
    setup(){
        const toast = useToast();

          return {
              toast
        }
    },
    methods:{
        async getTrashItems(){
            const result = await axios.get(`${process.env.VUE_APP_BACKEND_SERVER}/trash`);
            this.trash = result.data.trash;
        },
        async restoreItem(id){
            const result = await axios.post(`${process.env.VUE_APP_BACKEND_SERVER}/restore`, {id});
            console.log(result)
            this.toast.success(`Success on Restore Item ${id}`);
            this.getTrashItems();
        },
        async deleteItem(id){
            const result = await axios.delete(`${process.env.VUE_APP_BACKEND_SERVER}/trash?id=${id}`);
            console.log(result)
            this.toast.success(`Success on Delte Item ${id}`);
            this.getTrashItems();
        }

    },
    created(){
        this.getTrashItems();
    }
}
</script>

<style>

</style>