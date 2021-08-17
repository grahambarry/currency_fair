<template>
  <div>
    <div v-if="signedIn" ref="scrollContainer" @scroll="throttleScrollThrottled" class="container">
      <div class="left">
        <Stepper :steps="steps"/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
        Lorum <br/>
      </div>
      <div class="right">
        <div class="fixed-panel">
        </div>
      </div>
    </div>
    <div v-else>
      <h1>You are not signed in.</h1>
    </div>
  </div>
</template>
<script>
import Stepper from '~components/shared/Stepper.vue'
import _ from 'lodash'

export default {
  name: 'TransactionInfo',
  components: {
    Stepper
  },
  data() {
    return {
      scrollDelta: 20,
      myLastScrollPos: null,
      topValue: '0px',
      lastScroll: 0,
      currentScroll: 0,
      throttleScrollThrottled: _.throttle(this.throttleScroll, 50),
      myCurrentScrollThrottled: _.throttle(this.myCurrentScroll, 100),
      steps: [
        { 'label': 'Transaction info'},
        { 'label': 'Recipient info'},
        { 'label': 'Make payment'},
      ]

    } 
  },
  mounted() {
    this.currentScroll = this.$refs.scrollContainer.scrollY
  },
  methods: {
    throttleScroll: function () {
      let initialTopValue = this.topValue
      this.myLastScrollPos = this.myCurrentScroll()
      let myCurrent = this.myCurrentScrollThrottled()
      if (this.myLastScrollPos < 120 || myCurrent < 120 ) {
        this.topValue = '0px'
      }
      else {
        if (myCurrent <= (this.myLastScrollPos - 2)) {
          this.topValue = '-80px'
        }
        if (myCurrent > (this.myLastScrollPos + 2)) {
          this.topValue = '0px'
        }
      }
      initialTopValue != this.topValue ? this.changeTopValue() : null
    },
    myCurrentScroll: function () {
      return this.$refs.scrollContainer.scrollTop
    },
    changeTopValue: function () {
      this.$emit('emitTop', this.topValue)
    }
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .overflow-x {
    overflow-x: auto;
  }
  .container {
    box-sizing: border-box;
    position: absolute;
    background-color: $body-background;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
    @extend %amm-flex-row;
    .left {
      box-sizing: border-box;
      flex-basis: 59%; // 845px as percentage of 1440px
      padding: ($nav-height + 54px) 53px 225px $document-padding;
      z-index: 2;
    }
    .right {
      position: relative;
      box-sizing: border-box;
      flex-basis: 41%; // 595px as percentage of 1440px
      .fixed-panel {
        position: fixed;
        top: 0px;
        box-sizing: border-box;
        background: $panel-gray;
        border-left: 1px solid $border-gray;
        height: 100vh;
        width: 100%;
        padding-top: $nav-height;
      }
    }
  }
  @media screen and (max-width: $breakpoint-small) {
    .container {
      flex-flow: column nowrap !important;
      .right {
        .fixed-panel {
          position: relative;
          background: red;
        }
      }
      .left {
        padding-bottom: 54px;
        padding-top: $nav-height + 12px;
      }
      .left, .right {
        width: 100%;
        flex-basis: 100%;
        padding-left: 0px;
        padding-right: 0px;
      }
    }
  }
</style>
