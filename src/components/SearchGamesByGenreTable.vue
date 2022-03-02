<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>        
        <th>AppID</th>
        <th>Title</th>        
        <th>System</th>       
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">        
        <td>{{game.app_id }}</td>
        <td>{{game.title}}</td>            
        <td>{{game.system}}</td>        
      </tr>
    </tbody>   
</table>
</template>

<script>
export default {
  name: 'SearchGamesByGenreTable',
  props: ["games"]  
}
</script>

<style scoped>

</style>