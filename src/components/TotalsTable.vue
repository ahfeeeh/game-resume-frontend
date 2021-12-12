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
        <tr v-for="(d, idx) in data" :key="idx">
          <th scope="row">{{ idx }}</th>
          <td>{{ d.description }}</td>
          <td>{{ d.total_games }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TotalsTable",
  props: {
    data: Array,
  },
};
</script>

<style>
</style>