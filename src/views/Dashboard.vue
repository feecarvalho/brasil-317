<template>
  <section class="dashboard">
  <h1>Dashboard</h1>
  <div class="dashboard__container">
    <div class="dashboard__percentage-portal">
      <div class="chart-type-pie">
      <apexcharts
      heigth="245"
      type="pie"
      :options="chartOptions"
      :series="series">
      </apexcharts>
      </div>
    </div>
  </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import ApexCharts from 'apexcharts';

Vue.component('apexcharts', ApexCharts);

export default Vue.extend({
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
      chartOptions: [50, 50],
      series: ['A', 'B'],
    };
  },
  methods: {

  },
});
</script>

<style lang="scss" scoped>

</style>
