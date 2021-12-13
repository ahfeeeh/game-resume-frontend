<template>
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Idx</th>
        <th>Title</th>
        <th>System</th>
        <th>Finished ?</th>
      </tr>
    </thead>
    <tbody>  
      <tr v-for="game, idx in games" :key="idx">
        <td>{{idx + 1 }}</td>
        <td>{{game.title}}</td>    
        <td>{{game.system}}</td>
        <td><input type="checkbox" v-model="game.finished" :disabled=true></td>                
      </tr>
    </tbody>   
</table>
</template>

<script>
export default {
  name: 'FinishedGamesTable',
  props: {
    games: Array
  }  
}
</script>

<style scoped>

</style>