<template>
  <div>
    <div v-if="signedIn" ref="scrollContainer" @scroll="throttleScrollThrottled" id="parallaxid" class="parallax">
      <div v-for="(section, index) in workSections" :key="index" 
           :class="section.section.length > 1 ? 'multi-row-section' : ''"
           :style="section.section.length > 2 ? 'overflow-x:auto' : ''">
        <LineJoiner v-for="(subSection, i) in section.section " :key="i"
                    :sectionId="subSection.sectionId"
                    :annLeft="subSection.annLeft"
                    :annRight="subSection.annRight"
                    :annTop="subSection.annTop"
                    :annBottom="subSection.annBottom"
                    :imageWidth="subSection.imageWidth"
                    :imageLeft="subSection.imageLeft"
                    :imageRight="subSection.imageRight"
                    :imageTop="subSection.imageTop"
                    :imageBottom="subSection.imageBottom"
                    :width="subSection.width"
                    :faded="subSection.faded"
                    :linePos="subSection.linePos"
                    :bodyColor="subSection.bodyColor"
                    :annotateColor="subSection.annotateColor"
                    :arrowColor="subSection.arrowColor"
                    :h1Color="subSection.h1Color"
                    :h2Color="subSection.h2Color"
                    :pColor="subSection.pColor"
                    :arrowIsOn="subSection.arrowIsOn"
                    :xArrow="subSection.xArrow"
                    :yArrow="subSection.yArrow"
                    :xImage="subSection.xImage"
                    :yImage="subSection.yImage"
                    :layer="subSection.layer"
                    :sectionHeight="subSection.sectionHeight"
                    :heading="subSection.heading"
                    :subheading="subSection.subheading"
                    :paragraph="subSection.paragraph"
                    :images="subSection.images"
                    :slackness="subSection.slackness"/>
      </div>
    </div>
    <div v-else>
      <h1>You are not signed in so you CANNOT View it!</h1>
    </div>
  </div>
</template>
<script>
import LineJoiner from '~components/shared/LineJoiner'
import WorkSections from '~components/json/WorkSections.json'
import _ from 'lodash'

export default {
  components: {
    LineJoiner
  },
  name: 'Showcase',
  data() {
    return {
      workSections: WorkSections,
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
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .multi-row-section {
    @extend %amm-flex-row;
    height: 120vh;
    overflow: hidden;
  }
  .overflow-x {
    overflow-x: auto;
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
  /* Parallax Styles Media Query */
  // @media screen and (min-width: $breakpoint-small) {
  //   @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
  //     .parallax {
  //       -webkit-perspective: 300px;
  //       perspective: 300px;
  //       -webkit-perspective-origin-x: 100%;
  //       perspective-origin-x: 100%;
  //       font-size: 200%;
  //     }
  //   }
  // }
  @media screen and (max-width: $breakpoint-small) {
    .multi-row-section {
      flex-flow: row wrap !important;
      height: auto;
    }
  }
</style>
