<template>
  <nav class="navbar" :style="{top: topValue}">
    <h1><span class="script">Graham Barry</span></h1>
    <BurgerMenu icon-hover-color="#AAEFE8"
                class="burger-icon"/>
    <ul v-if="signedIn" class="nav-items">
      <li class="nav-item">
        <a class="nav-link"
          href="#"
          @click.prevent="handleSignOut">
          Sign out
        </a>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" class="nav-link">
          About Me
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'home' }" class="nav-link">
          My Work
        </router-link>
      </li>
    </ul>
    <ul v-else class="nav-items">
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
          My Work
        </router-link>
      </li>
    </ul>
    <div class="spacer-33"></div>
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
    align-items: center;
    justify-content: space-between;
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
      white-space: nowrap;
      -moz-only-whitespace: nowrap;
      .script {
        font-family: $font-family-script;
        font-size: 30px;
      }
    }
    .spacer-33 {
      flex-basis: 33%;
      flex-shrink: 2;
    }
    .nav-items {
      @extend %amm-flex-row;
      align-items: center;
      margin: 0px;
      margin-top: 12px;
      margin-right: 50px;
      li.nav-item {
        text-decoration: none;
        list-style: none;
        margin-left: 50px;
        height: 30px;
        @extend %amm-flex-row;
        align-items: flex-end;
        a.nav-link {
          white-space: nowrap;
          -moz-only-whitespace: nowrap;
          color:#686C6B;
          font-family: $font-family-1;
          font-size: 19px;
          line-height: 30px;
          text-decoration: none;
          &:hover {
            color:#493ebe;
          }
          &.router-link-active {
            text-decoration: underline !important;
          }
        }
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