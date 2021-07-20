<template>
  <nav class="navbar" :style="{top: topValue}">
    <h1><span class="script">Graham Barry</span></h1>
    <BurgerMenu icon-hover-color="#AAEFE8"
                @click="openMenu"
                class="burger-icon"/>
    <div class="nav-wrapper" :class="{open: isOpen}">
      <div v-if="isOpen" @click="openMenu" class="nav-bg"></div>
      <ul v-if="signedIn" class="nav-items">
        <li class="burger-slide">
          <BurgerMenu icon-hover-color="#AAEFE8" @click="openMenu"/>
        </li>
        <li v-for="(route, index) in routes" :key="index" class="nav-item">
          <router-link :to="{ name: route }" class="nav-link">
            {{route}}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link"
            href="#"
            @click.prevent="handleSignOut">
            Sign out
          </a>
        </li>
      </ul>
      <ul v-else class="nav-items">
        <li class="nav-item">
          <router-link
            :to="{ name: 'about' }"
            class="nav-link">
            About
          </router-link>
        </li>
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
        <li>
          <BurgerMenu icon-hover-color="#AAEFE8"
                      class="burger-slide"/>
        </li>
      </ul>
    </div>
    <div class="spacer-20"></div>
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
  data () {
    return {
      isOpen: false,
      routes: ['About', 'Showcase', 'Contact']
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
    openMenu: function() {
      this.isOpen = !this.isOpen;
    }
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
    background: #FFF;
    @extend %amm-flex-row;
    align-items: center;
    justify-content: space-between;
    transition: top .2s ease-in-out;
    .burger-icon {
      position: absolute;
      top: 30px;
      right: 31px;
      display: none;
    }
    h1 {
      z-index: 1;
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
        color: $dark-gray;
      }
    }
    .nav-wrapper {
      .nav-bg {
        -webkit-transition: opacity 0.8s ease-in-out;
        -moz-transition: opacity 0.8s ease-in-out;
        -o-transition: opacity 0.8s ease-in-out;
        transition: opacity 0.8s ease-in-out;
        opacity: 0;
      }
    }
    .spacer-20 {
      flex-basis: 20%;
      flex-shrink: 2;
    }
    .nav-items {
      @extend %amm-flex-row;
      -webkit-transition: right 0.2s ease-in-out;
      -moz-transition: right 0.2s ease-in-out;
      -o-transition: right 0.2s ease-in-out;
      transition: right 0.2s ease-in-out;
      align-items: center;
      margin: 0px;
      margin-top: 29px;
      margin-bottom: 21px;
      margin-right: 80px;
      li.burger-slide {
        display: none;
      }
      li.nav-item {
        text-decoration: none;
        list-style: none;
        margin-left: 50px;
        height: 30px;
        @extend %amm-flex-row;
        align-items: flex-end;
        a.nav-link {
          position: relative;
          white-space: nowrap;
          -moz-only-whitespace: nowrap;
          color:#686C6B;
          font-family: $font-family-1;
          font-size: 19px;
          line-height: 30px;
          text-decoration: none;
          &.router-link-active:after {
            visibility: visible;
            width: 100%;
          }
          &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 4px;
            bottom: -4px;
            left: 0;
            background-color: $purple;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
          }
        }
        a.nav-link:hover:after {
          visibility: visible;
          width: 100%;
        }
      }
    }
    .sub-menu {
      position: fixed;
      opacity: .15;
      top: 160px;
      left: 40px;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition-duration: 0.6s;
      transition-property: opacity;
      transition-timing-function: ease;
    }
    .fade-enter,
    .fade-leave-active {
      opacity: 1
    }
  }
  @media screen and (max-width: $breakpoint-phone) {
    .navbar {
      z-index: 4;
      .burger-icon {
        display: block;
      }
      .nav-wrapper.open {
        .nav-bg {
          opacity: 0.85;
          position: fixed;
          width: 100vw;
          height: 100vh;
          z-index: 2;
          bottom: 0;
          top: 0;
          right: 0;
          left: 0;
          overflow: hidden;
          background-color: $bg-gray;
        }
        .nav-items {
          right: 0px;
        }
      }
      .nav-items {
        position: fixed;
        padding-left: 31px;
        padding-top: 130px;
        flex-flow: column wrap !important;
        align-items: flex-start;
        height: 100vh;
        width: 210px;
        margin-right: 0px;
        margin-top: 0px;
        top: 0px;
        right: -215px;
        z-index: 2;
        background: $light-gray;
        li.nav-item {
          margin-left: 0px;
          height: 58px;
          a.nav-link {
            line-height: 58px;
            &:after {
              bottom: 7px;
            }
          }
        }
        li.burger-slide {
          display: block;
          z-index: 4;
          position: absolute;
          top: 30px;
          right: 31px;
        }
      }
    }
  }
</style>
