<template>
  <section class="filters">
    <h1>Filtros</h1>
    <div class="filters__container">
      <b-table
            :data="data"
            :columns="columns">
        </b-table>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'Filters',
  components: {},
  data() {
    return {
      data: [],
      columns: [
        {
          field: 'UnidadeCompradora',
          label: 'Unidade Compradora',
          searchable: true,
        },
        {
          field: 'DataPublicacao',
          label: 'Data',
          searchable: true,
        },
        {
          field: 'Items',
          label: 'Quantidade Total de Itens',
          searchable: true,
        },
      ],
    };
  },
  methods: {
    getData() {
      axios.get('http://www.mocky.io/v2/5e42ebca2f0000013687fa64')
        .then((response) => {
          this.data = response.data.map((element) => {
            const item = { ...element };
            item.Items = item.Items.length;
            // eslint-disable-next-line prefer-destructuring
            item.DataPublicacao = item.DataPublicacao.split(' ')[0].split('-').reverse().join('/');
            return item;
          });

          return this.data;
        });
    },
  },
  async mounted() {
    await this.getData();
  },
});
</script>

<style lang="scss" scoped>
  .filters {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    overflow: scroll;

    h1 {
      align-self: baseline;
      flex: 1 1 100%;
      padding: 15px 0;
      height: 10%;
      font-size: 1.35em;
      font-weight: bold;
    }

    &__container {
      width: 90%;
      height: 85vh;
      margin: 0 auto;
      border-top: 2px solid #dbdbdb;
    }
  }
</style>
