<template>
  <div>
    <div v-if="signedIn" ref="scrollContainer" @scroll="throttleScrollThrottled" id="parallaxid" class="parallax">
      <h1>About</h1><br><br><br><br><br><br><br>
      <h1>About</h1><br><br><br><br><br><br><br>
      <h1>About</h1><br><br><br><br><br><br><br>
      <h1>About</h1><br><br><br><br><br><br><br>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  components: {
  },
  name: 'About',
  data() {
    return {
      scrollDelta: 20,
      myLastScrollPos: null,
      topValue: '0px',
      lastScroll: 0,
      currentScroll: 0,
      throttleScrollThrottled: _.throttle(this.throttleScroll, 50),
      myCurrentScrollThrottled: _.throttle(this.myCurrentScroll, 100),

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
  @import 'app/assets/stylesheets/design_vars';
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .parallax {
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
  }
</style>
