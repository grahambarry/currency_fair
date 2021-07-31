<template>
  <div class="row">
    <Alerts :alerts="errors" />
    <div class="">
      <h2>Sign in</h2>
      <form class="">
        <GbInput v-model="form.email" label="Email" autofocus="autofocus"/>
        <GbInput v-model="form.password" label="Password"/>
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
