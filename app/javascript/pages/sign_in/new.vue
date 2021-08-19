<template>
  <div class="container">
    <Alerts :alerts="errors" />
    <div class="signin-container">
      <form class="form">
        <Input v-model="form.email" label="Email" autofocus="autofocus"/>
        <Input v-model="form.password" type="password" label="Password"/>
        <div class="">
          <button
            class="gb-button"
            @click.prevent="handleSignIn">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Alerts from '~components/shared/alerts';
import Input from '~components/shared/Input';
import _get from 'lodash/get';
import signIn from '~mutations/signIn';
import { AUTH_TOKEN_KEY } from '~configuration/appConstants';
import { mapMutations } from 'vuex';

export default {
  name: 'SignIn',
  components: { Alerts, Input },
  data() {
    return {
      errors: [],
      form: {},
    };
  },
  methods: {
    ...mapMutations(['signIn']),
    handleSignIn() {
      signIn({
        apollo: this.$apollo,
        ...this.form,
      }).then(response => _get(response, 'data.signIn', {}))
      .then(response => {
        if(response.success) {
          const user = response.user;
          this.signIn(user);
          localStorage.setItem(AUTH_TOKEN_KEY, user.authenticationToken);
          this.$router.push({ name: 'Transaction info' });
        } else {
          this.errors = this.errorMessages(response.data.signIn.errors);
        }
      }).catch(error => {
        this.errors = [error];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/design_vars';
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .container {
    background-color: $limebg;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
    .signin-container {
      position: relative;
      width: 340px;
      margin: 0 auto;
      margin-top: 210px;
    }
    .gb-button {
      transition: all 2 ease-in-out;
      height: 50px;
      background-color: $midgreen;
      width: 100%;
      font-family: $font-family-2;
      font-size: 19px;
      line-height: 46px;
      color: $litegreen;
      border-radius: 4px;
      border: 2px solid $midgreen;
      cursor: pointer;
      &:hover {
        border: 2px solid $litegreen;
        box-shadow: 0 2px 7px rgba(43, 97, 138, 0.12);
      }
    }
  }
</style>
