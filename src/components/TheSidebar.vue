<template>
  <div v-if="show" class="sidebar">
    <div>
      <div class="sidebar__logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <ul>
        <router-link to="/">
        <i class="fas fa-chart-bar"></i>
        <li>Dashboard</li>
        </router-link>
        <router-link to="/filter">
        <i class="fas fa-search"></i>
        <li>Filtros</li>
        </router-link>
      </ul>
    </div>
    <div class="sidebar__logout">
      <i class="fas fa-sign-out-alt"></i>
      <li @click="logout"><a>Logout</a></li>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheSidebar',
  data() {
    return {
      show: true,
      route: window.location.pathname,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler(to, from) {
        console.log(to);
        if (to === '/login') {
          this.show = false;
        } else {
          this.show = true;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
  .sidebar {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 15%;
      background: #031d34;
      justify-content: space-between;
      color: white;

      &__logo {
        padding: 20px 0;
      }

      a {
        display: flex;
        padding: 10px;
        align-items: center;
      }

      li, a {
        margin-left: 5px;
        text-decoration: none;
        color: white;
        list-style: none;
        font-weight: bold;
        text-transform: uppercase;
      }
      &__logout {
        flex-direction: column;
        display: flex;
        align-items: center;
        bottom: 0px;
        width: 100%;
        padding: 10px;
        font-weight: bold;

        li, a {
          margin-left: 0;
          padding: 0;
        }
      }
  }
</style>
