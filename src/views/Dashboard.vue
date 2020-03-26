<template>
  <section class="dashboard">
  <h1>Dashboard</h1>
  <div class="dashboard__charts">
    <ul class="dashboard__charts-options">
      <li @click="showChart('byDate')" :class="[{'active-chart': showChartByDate}]">
        Editais por data
      </li>
      <li @click="showChart('percentageByPortal')"
        :class="[{'active-chart': showChartPercentageByPortals}]">
          Porcentagem de editais por portal
      </li>
      <li @click="showChart('byPurchasingUnity')"
        :class="[{'active-chart': showChartPurchasingUnity}]">
        Editais por unidade compradora (UASG)
      </li>
    </ul>
  </div>
  <div class="dashboard__container">
    <div v-if="showChartByDate" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          height="370"
          type="donut"
          :options="this.byDate.options"
          :series="this.byDate.series">
        </apexchart>
      </div>
    </div>
    <div v-if="showChartPercentageByPortals" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          height="370"
          type="bar"
          :options="this.percentagePortal.options"
          :series="this.percentagePortal.series">
        </apexchart>
      </div>
    </div>
    <div v-if="showChartPurchasingUnity" class="dashboard__chart-render">
      <div class="chart-type-pie">
        <apexchart
          height="370"
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
    showChart(param: string) {
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

    h1 {
      padding: 15px 0;
      height: 10%;
      font-size: 1.35em;
      font-weight: bold;
    }

    &__charts {
      width: 90%;
      height: 15%;
      display: flex;
      border-top: 2px solid #ccc;
      justify-content: center;
      margin: 0 auto;

      ul {
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-top: 10px;
      }

      li {
        padding: 15px 5px;
        margin: auto 15px;
        width: 30%;
        background: #ddd;
        border-top: 6px solid #031d34;
        border-radius: 2px;
        text-transform: uppercase;
        padding: 5px 8px;
        font-size: .7em;
        font-weight: bold;
        cursor: pointer;
      }

      li.active-chart {
        border-top: 6px solid #368ECF;
        font-size: 0.75em;
      }
    }

    &__container {
      display: flex;
      width: 80%;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
    }

    &__chart-render {
      margin-top: 20px;
      width: 100%;
    }
  }

  @media (max-width: 530px) {
    .dashboard__charts li {
      font-size: 0.6em;
    }
  }
</style>
