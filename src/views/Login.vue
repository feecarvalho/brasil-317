<template>
  <section class="login">
    <div class="login__logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <form action="" class="login__form">
      <div class="login__input field">
        <label class="label">e-mail</label>
        <div class="control">
          <input
            :class="[{'is-danger': isEmailValid}, 'input']"
            type="email"
            v-model="user.email"
            placeholder="e-mail">
          <p v-if="isEmailValid" class="help is-danger">Formato de e-mail inválido.</p>
        </div>
      </div>
      <div class="login__input field">
        <label class="label">senha</label>
        <div class="control">
          <input
            :class="[{'is-danger': isPasswordValid}, 'input']"
            type="password"
            v-model="user.password"
            placeholder="senha">
          <p v-if="isPasswordValid"
            class="help is-danger">
            Sua senha deve conter no mínimo 8 caractéres
          </p>
        </div>
        <p v-if="isUserValid" class="help is-danger">Credenciais inválidas.</p>
      </div>
      <div class="login__button control">
        <button
          @click.prevent="getAuthentication"
          type="submit"
          class="button is-link">
            Login
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Login',
  components: {},
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isEmailValid: false,
      isPasswordValid: false,
      isUserValid: false,
    };
  },
  methods: {
    ...mapActions({
      getToken: 'getToken',
    }),
    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      return !re.test(this.user.email);
    },
    validatePassword() {
      return this.user.password.length < 8;
    },
    getAuthentication() {
      this.isEmailValid = this.validateEmail();
      this.isPasswordValid = this.validatePassword();
      if (this.isEmailValid || this.isPasswordValid) return;
      this.getToken(this.user)
        .then((res) => {
          console.log(res);
          if (res) {
            this.$router.push('/');
          } else {
            this.isUserValid = true;
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped>
  .login {
    background:  url('../assets/login-background.jpg');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    &__form {
      min-width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 768px) {
        width: 60%;
      }

      @media (max-width: 468px) {
        width: 90%;
      }
    }

    &__button {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        background: rgb(70,195,78);
        background: linear-gradient(180deg, rgba(70,195,78,1) 0%, rgba(6,108,60,1) 100%);
        width: 50%;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: none;
        margin-top: 3%;

        @media (max-width: 468px) {
          width: 100%;
        }
      }
    }

    &__input {
      label {
        text-align: left;
        color: white;
      }
    }
  }

</style>
