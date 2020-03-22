<template>
  <section class="dashboard">
  <h1>Dashboard</h1>
  <div class="dashboard__container">
    <div class="dashboard__percentage-portal">
      <div class="chart-type-pie">
        <apexchart
        heigth="245"
        type="donut"
        :options="this.percentagePortal.options"
        :series="this.percentagePortal.series">
        </apexchart>
      </div>
    </div>
    <div class="dashboard__percentage-portal">
      <div class="chart-type-pie">
        <apexchart
        heigth="245"
        type="donut"
        :options="this.percentagePortal.options"
        :series="this.percentagePortal.series">
        </apexchart>
      </div>
    </div>
    <div class="dashboard__percentage-portal">
      <div class="chart-type-pie">
        <apexchart
        heigth="245"
        type="donut"
        :options="this.percentagePortal.options"
        :series="this.percentagePortal.series">
        </apexchart>
      </div>
    </div>
  </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import axios from 'axios';

Vue.component('apexchart', VueApexCharts);

export default Vue.extend({
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
      percentagePortal: {
        options: {
          labels: [],
        },
        series: [],
      },
    };
  },
  methods: {
    loadData() {
      axios.get('http://www.mocky.io/v2/5e42ebca2f0000013687fa64')
        .then((response) => {
          const portals = response.data.map((res) => res.Portal);
          const novamente = portals.reduce((prev: { [x: string]: number }, cur: string) => {
            const oi = prev;
            oi[cur] = (oi[cur] || 0) + 1;
            return oi;
          }, {});

          Object.keys(novamente).forEach((e) => {
            this.percentagePortal.options.labels.push(e);
            this.percentagePortal.series.push(novamente[e]);
          });

          console.log(this.percentagePortal);
        });
    },
  },
  mounted() {
    this.loadData();
  },
});
</script>

<style lang="scss" scoped>
  .dashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &__percentage-portal {
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
