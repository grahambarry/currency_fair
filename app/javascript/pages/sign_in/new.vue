<template>
  <div ref="scrollContainer" @scroll="throttleScrollThrottled" id="parallaxid" class="parallax">
    <Alerts :alerts="errors" />
    <div class="signin-container">
      <form class="form">
        <GbInput v-model="form.email" label="Email" autofocus="autofocus"/>
        <GbInput v-model="form.password" type="password" label="Password"/>
        <div class="">
          <button
            class=""
            @click.prevent="handleSignIn"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Alerts from '~components/shared/alerts';
import GbInput from '~components/shared/gbInput';
import _get from 'lodash/get';
import signIn from '~mutations/signIn';
import { AUTH_TOKEN_KEY } from '~configuration/appConstants';
import { mapMutations } from 'vuex';

export default {
  name: 'SignIn',
  components: { Alerts, GbInput },
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
          this.$router.push({ name: 'about' });
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
  .parallax {
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
    -webkit-perspective: 300px;
    perspective: 300px;
    -webkit-perspective-origin-x: 100%;
    perspective-origin-x: 100%;
    font-size: 200%;
    .signin-container {
      position: relative;
      width: 340px;
      margin: 0 auto;
      margin-top: 210px;
    }
  }
</style>
