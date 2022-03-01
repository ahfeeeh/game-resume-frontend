<template>
  <div>
    <table class="table table-sm table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Genre</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, idx) in data" :key="idx">
          <th scope="row">{{ idx }}</th>
          <td>{{ d.genre }}</td>
          <td>{{ d.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TotalGenresTable",
  props: {
    data: Array,
  },
};
</script>

<style>
</style>