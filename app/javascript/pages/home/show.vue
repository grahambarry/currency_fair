<template>
  <div>
    <div v-if="signedIn" id="parallaxid" class="parallax">
      <div v-for="(section, index) in workSections" :key="index" :class="section.section.length > 1 ? 'amm-flex-row' : ''">
        <LineJoiner v-for="(subSection, i) in section.section " :key="i"
                    :sectionId="subSection.sectionId"
                    :annLeft="subSection.annLeft"
                    :annRight="subSection.annRight"
                    :annTop="subSection.annTop"
                    :annBottom="subSection.annBottom"
                    :width="subSection.width"
                    :small="subSection.small"
                    :large="subSection.large"
                    :faded="subSection.faded"
                    :bodyColor="subSection.bodyColor"
                    :annotateColor="subSection.annotateColor"
                    :arrowColor="subSection.arrowColor"
                    :h1Color="subSection.h1Color"
                    :h2Color="subSection.h2Color"
                    :pColor="subSection.pColor"
                    :isLeft="subSection.isLeft"
                    :xArrow="subSection.xArrow"
                    :yImage="subSection.yImage"
                    :layer="subSection.layer"
                    :sectionHeight="subSection.sectionHeight"
                    :heading="subSection.heading"
                    :subheading="subSection.subheading"
                    :paragraph="subSection.paragraph"
                    :images="subSection.images"
                    :slackness="subSection.slackness"/>
      </div>
      <!-- <div class="amm-flex-row">
        <LineJoiner v-for="(subsections, index) in section" :key="index"
            :width="width"
            :sectionId="section.sectionId"
            :small="section.small"
            :large="section.large"
            :faded="section.faded"
            :bodyColor="section.bodyColor"
            :annotateColor="section.annotateColor"
            :h1Color="section.h1Color"
            :h2Color="section.h2Color"
            :pColor="section.pColor"
            :isLeft="section.isLeft"
            :xArrow="section.xArrow"
            :yImage="section.yImage"
            :layer="section.layer"
            :sectionHeight="section.sectionHeight"
            :heading="section.heading"
            :subheading="section.subheading"
            :paragraph="section.paragraph"
            :images="section.images"/>

      </div> -->
      <!-- <LineJoiner sectionId="fourth" 
                  bodyColor="#7BE0BC" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  :flipped="false"/>
      <LineJoiner sectionId="fifth" 
                  bodyColor="#AAEFE8" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  :flipped="false"/>
      <LineJoiner sectionId="sixth" 
                  bodyColor="#7BE0BC" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  :flipped="false"/> -->
    </div>
    <div v-else>
      <h1>You are not signed in so you CANNOT View it!</h1>
    </div>
  </div>
</template>
<script>
import LineJoiner from '~components/shared/LineJoiner'
import WorkSections from '~components/json/WorkSections.json'

export default {
  components: {
    LineJoiner
  },
  name: 'HomePage',
  data() {
    return {
      gestaltImages: [
        { maxWidth: '1100px', src: 'alkStaffDashImg.webp', type: 'webp'},
        { maxWidth: '1900px', src: 'alkStaffDashImg.png', type: 'png'},
      ],
      workSections: WorkSections,
    } 
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .amm-flex-row {
    @extend %amm-flex-row;
    height: 120vh;
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
  /* Parallax Styles Media Query */
  /* @media screen and (min-width: 1000px) {
    @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
      .parallax {
        -webkit-perspective: 300px;
        perspective: 300px;
        -webkit-perspective-origin-x: 100%;
        perspective-origin-x: 100%;
        font-size: 200%;
      }
    }
  } */
</style>
