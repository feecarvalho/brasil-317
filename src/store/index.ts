import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    getToken: async ({ commit }, user) => {
      let result = false;
      if (user.email === 'felipecarvalho@brasil317.com.br' && user.password === '12345678') {
        await axios.get('http://www.mocky.io/v2/5e42ec102f0000270087fa65')
          .then((response) => {
            const { token } = response.data;
            commit('updateToken', token);
            localStorage.setItem('token', token);
            result = true;
          })
          .catch(() => { throw new Error(); });
      } else {
        result = false;
      }
      return result;
    },
  },
  modules: {
  },
});
