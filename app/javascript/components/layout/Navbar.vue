<template>
  <nav class="navbar" :style="{top: topValue}">
    <h1><span class="script">Graham Barry</span> &#160 | &#160 UX Developer</h1>
    <BurgerMenu icon-hover-color="#AAEFE8"
                class="burger-icon"/>
    <ul v-if="signedIn" class="sub-menu">
      <li class="nav-item active">
        <span class="nav-link disabled">
          {{ userFullName }}
        </span>
      </li>
      <li class="nav-item">
        <a class="nav-link"
          href="#"
          @click.prevent="handleSignOut">
          Sign out
        </a>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" class="nav-link">
          Content Page
        </router-link>
      </li>
    </ul>
    <ul v-else class="navbar-nav">
      <li class="nav-item">
        <router-link
          :to="{ name: 'sign_in' }"
          class="nav-link">
          Sign In
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'sign_up' }"
          class="nav-link">
          Sign up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'home' }"
          class="nav-link">
          Content Page
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import BurgerMenu from '~components/shared/BurgerMenu.vue';
import _get from 'lodash/get';
import signOutMutation from '~mutations/signOut';
import { AUTH_TOKEN_KEY } from '~configuration/appConstants';
import { mapActions } from 'vuex';

export default {
  name: 'Navbar',
  components: {
    BurgerMenu
  },
  props: {
    topValue: {
      type: String,
      default: '0px'
    }
  },
  methods: {
    ...mapActions(['signOut']),
    handleSignOut() {
      return signOutMutation({ apollo: this.$apollo })
        .then(response => _get(response, 'data.signOut.success', false))
        .then(success => {
          if (success) {
            this.signOut()
            localStorage.setItem(AUTH_TOKEN_KEY, '')
            return this.$apollo.provider.clients.defaultClient.resetStore()
          }
        }).then(() => {
          this.$router.push({ name: 'sign_in' })
        })
    },
  },
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  .navbar {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #F0F6F3;
    @extend %amm-flex-row;
    transition: top .2s ease-in-out;
    .burger-icon {
      position: absolute;
      top: 30px;
      right: 31px;
    }
    h1 {
      margin-left: 31px;
      margin-top: 30px;
      font-family: $font-family-1;
      font-size: 24px;
      line-height: 30px;
      color: #2B618A;
      font-weight: 300;
      .script {
        font-family: $font-family-script;
        font-size: 30px;
      }
    }
    .sub-menu {
      position: fixed;
      opacity: .15;
      top: 160px;
      left: 40px;
    }
  }
</style>