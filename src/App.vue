<template>
  <div id="app">
    <TheSidebar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TheSidebar from './components/TheSidebar.vue';

export default Vue.extend({
  components: {
    TheSidebar,
  },
});
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media(max-width: 768px) {
  .b-table .table-wrapper.has-mobile-cards thead {
    display: flex !important;
  }
  .b-table .table thead {
    display: flex;
    margin: 1rem 0;
    padding: 5px 0;
    font-size: .8rem;
    text-transform: uppercase;
  }
  .b-table .table thead tr:first-child {
    display: flex;
    flex-direction: column;
    box-shadow: none;
    width: 45%;
    margin-bottom: 0 !important;
    height: 140px;
    justify-content: space-around;
  }

  .b-table .table thead tr:last-child {
    display: flex;
    flex-direction: column;
    box-shadow: none;
    width: 55%;
    margin-bottom: 0 !important;
    height: 140px;
    line-height: 16px;
    justify-content: space-around;

    th {
      padding: 6px;
    }
  }
  .table th {
    border: none !important;
  }

  .control {
    width: 100%;

    input {
      height: 26px;
    }
  }
}
</style>
