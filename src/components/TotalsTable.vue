<template>
  <div>
      <table class="table table-sm table-dark">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Total</th>      
            </tr>
        </thead>
        <tbody>
            <tr v-for="(d, idx) in data" :key="idx" >
            <th scope="row">{{idx}}</th>
            <td>{{d.description}}</td>
            <td>{{d.total_games}}</td>      
            </tr>    
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
 name: "TotalsTable",
  components: {
    
  },
  data(){
    return {
      data: []
    }
  },
  setup() {

  },
  created() {    
    setTimeout(() =>{
      axios.get('http://localhost:4000/statistics?from=totals').then(resp => {
      this.data = resp.data.result;
    })
    },1000)    
  }
}
</script>

<style>

</style>