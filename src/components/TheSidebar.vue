<template>
  <div v-if="show" class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <div @click="responsiveMenu" class="sidebar__btn">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div :class="[{'show': isActive}, 'sidebar__container']">
      <ul class="sidebar__links">
        <router-link to="/">
        <li :class="[{'selected': dashboardActive}]">
          <i class="fas fa-chart-bar"></i>
          Dashboard
        </li>
        </router-link>
        <router-link to="/filter">
        <li :class="[{'selected': filterActive}]">
          <i class="fas fa-search"></i>
          Filtros
        </li>
        </router-link>
      </ul>
    <div class="sidebar__logout">
      <li @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </li>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheSidebar',
  data() {
    return {
      dashboardActive: false,
      filterActive: false,
      show: true,
      isActive: false,
      route: window.location.pathname,
    };
  },
  methods: {
    responsiveMenu() {
      this.isActive = !this.isActive;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.isActive = false;
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler(to, from) {
        if (to === '/login') {
          this.show = false;
        } else if (to === '/') {
          this.show = true;
          this.filterActive = false;
          this.dashboardActive = true;
        } else {
          this.dashboardActive = false;
          this.show = true;
          this.filterActive = true;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
$background-color: #031d34;

  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 15%;
    background: $background-color;
    justify-content: space-between;
    color: white;

    &__links li.selected::before {
      content: '';
      left: 10px;
      position: absolute;
      float: left;
      width: 5px;
      height: 25px;
      margin-right: 5px;
      background: #368ECF;
    }

    &__container {
      height: 80%;
      justify-content: space-between;
      flex-direction: column;
      display: flex;
    }

    &__btn {
      display: none;
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
      transition: 0.3s;

      span {
        display: block;
        width: 40px;
        margin: 6px;
        height: 3px;
        background: white;
      }

      @media (max-width: 768px) {
        display: block;
      }
    }

    .sidebar__btn:hover {
      transform: rotate(180deg);
    }
    .sidebar__btn:hover > span {
      background: teal;
    }

    &__logo {
      padding: 20px 0;
    }

    a {
      display: flex;
      padding: 10px;
      align-items: center;
      margin-bottom: 15px;
    }

    li, a {
      margin-left: 5px;
      text-decoration: none;
      color: white;
      list-style: none;
      font-weight: bold;
      text-transform: uppercase;
    }

    li:hover {
      color: teal;
    }
    &__logout {
      align-items: center;
      width: 100%;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;

      li, a {
        margin-left: 0;
        padding: 0;
      }
    }

    @media (max-width: 768px) {
      flex-direction: row;
      height: 80px;
      flex: 1 1 100%;
      .sidebar__container {
        position: absolute;
        width: 50%;
        right: 0;
        display: none;
        justify-content: space-between;
        flex-direction: column;
        height: 40vh;
        background: $background-color;
      }
      .sidebar__container.show {
        z-index: 1;
        top: 80px;
        display: flex;
      }

      &__logout {
        width: 100%;
        justify-content: center;
        display: flex;
        margin-bottom: 20px;
      }

      &__logo, &__logo img {
        padding: 0;
        height: 70px;
        margin: auto;
      }

      ul.sidebar__links {
        display: flex;
        flex-direction: column;
        height: 50%;
        align-items: center;
        justify-content: center;
        /* background: red; */
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
