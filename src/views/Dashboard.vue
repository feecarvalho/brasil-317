<template>
  <section class="dashboard">
  <h1>Dashboard</h1>
  <div class="dashboard__charts">
    <ul class="dashboard__charts-options">
      <li @click="showChart('byDate')">Editais por data</li>
      <li @click="showChart('percentageByPortal')">Porcentagem de editais por portal</li>
      <li @click="showChart('byPurchasingUnity')">Editais por unidade compradora (UASG)</li>
    </ul>
  </div>
  <div class="dashboard__container">
    <div v-if="showChartByDate" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          width="580"
          type="donut"
          :options="this.byDate.options"
          :series="this.byDate.series">
        </apexchart>
      </div>
    </div>
    <div v-if="showChartPercentageByPortals" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          width="580"
          type="bar"
          :options="this.percentagePortal.options"
          :series="this.percentagePortal.series">
        </apexchart>
      </div>
    </div>
    <div v-if="showChartPurchasingUnity" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          width="580"
          type="donut"
          :options="this.byPurchasingUnity.options"
          :series="this.byPurchasingUnity.series">
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

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

export default Vue.extend({
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
      showChartByDate: false,
      showChartPercentageByPortals: false,
      showChartPurchasingUnity: false,
      byDate: {
        options: {
          legend: {
            position: 'bottom',
          },
          labels: [],
        },
        series: [],
      },
      byPurchasingUnity: {
        options: {
          legend: {
            position: 'bottom',
          },
          labels: [],
        },
        series: [],
      },
      percentagePortal: {
        options: {
          char: {
            type: 'bar',
            heigth: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          legend: {
            position: 'bottom',
          },
          labels: [],
        },
        series: [{
          data: [],
        }],
      },
    };
  },
  methods: {
    showChart(param) {
      this.showChartByDate = false;
      this.showChartPurchasingUnity = false;
      this.showChartPercentageByPortals = false;
      if (param === 'byDate') {
        this.showChartByDate = true;
      } else if (param === 'percentageByPortal') {
        this.showChartPercentageByPortals = true;
      } else {
        this.showChartPurchasingUnity = true;
      }
    },
    reduceCounter(input) {
      const count = {};
      input.forEach((i) => { count[i] = (count[i] || 0) + 1; });
      return count;
    },
    loadData() {
      const percentageByPortalAux: string[] = [];
      axios.get('http://www.mocky.io/v2/5e42ebca2f0000013687fa64')
        .then((response) => {
          const portals = response.data.map((res) => res.Portal);
          const dataEditais = response.data.map((res) => res.DataPublicacao.split(' ')[0]);
          const unidadesCompradoras = response.data.map((res) => res.UnidadeCompradora);
          const resultDatas = this.reduceCounter(dataEditais);
          const resultPortals = this.reduceCounter(portals);
          const resultUnidades = this.reduceCounter(unidadesCompradoras);
          console.log(resultUnidades);
          // const result = portals.reduce((prev: { [x: string]: number }, cur: string) => {
          //   const acc = prev;
          //   acc[cur] = (acc[cur] || 0) + 1;
          //   return acc;
          // }, {});

          Object.keys(resultPortals).forEach((e) => {
            this.percentagePortal.options.labels.push(e);
            percentageByPortalAux.push(resultPortals[e]);
          });

          this.percentagePortal.series = [
            {
              data: percentageByPortalAux,
            },
          ];

          Object.keys(resultDatas).forEach((e) => {
            this.byDate.options.labels.push(e);
            this.byDate.series.push(resultDatas[e]);
          });

          Object.keys(resultUnidades).forEach((e) => {
            this.byPurchasingUnity.options.labels.push(e);
            this.byPurchasingUnity.series.push(resultUnidades[e]);
          });

          // Object.keys(result).forEach((e) => {
          //   this.percentagePortal.options.labels.push(e);
          //   this.percentagePortal.series.push(result[e]);
          // });
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
    flex-wrap: wrap;
    height: 100vh;

    h1 {
      align-self: baseline;
      flex: 1 1 100%;
      height: 10%;
      font-size: 1.35em;
      font-weight: bold;
    }

    &__charts {
      width: 20%;
      height: 90%;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 15%;
      }

      li {
        width: 100%;
        margin: 20px auto;
        background: #ddd;
        border-top: 6px solid #031d34;
        border-radius: 2px;
        text-transform: uppercase;
        padding: 5px 8px;
        font-size: .8em;
        font-weight: bold;
        cursor: pointer;
      }
    }

    &__container {
      display: flex;
      width: 80%;
      align-items: center;
      justify-content: center;
    }

    &__chart-render {
      width: 70%;
      margin: 0 auto;
    }
  }
</style>
