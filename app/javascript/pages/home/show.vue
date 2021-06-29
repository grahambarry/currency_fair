<template>
  <div v-if="signedIn">
    <div v-if="signedIn" id="parallaxid" class="parallax">
      <LineJoiner sectionId="first" 
                  small
                  faded
                  bodyColor="#AAEFE8" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  isLeft
                  xArrow="2"
                  yImage="65"
                  layer="deep"
                  sectionHeight="200"
                  heading="Gestalt Principles"
                  subheading="Alkimii"
                  paragraph="One of a series of dashboards displaying employee metrics."
                  :images="gestaltImages"/>
      <LineJoiner sectionId="second"
                  large
                  faded
                  h1Color="#493EBE"
                  xArrow="2"
                  annotateColor="#CFFFFA"
                  heading="Gestalt Principles"
                  bodyColor="#7BE0BC" 
                  layer="back"
                  sectionHeight="100"
                  :images="gestaltImages"/>
      <LineJoiner sectionId="third"
                  small
                  faded
                  xArrow="2"
                  yImage="15"
                  bodyColor="#AAEFE8" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  layer="base"
                  sectionHeight="125"
                  heading="Gestalt Principles"
                  subheading="Alkimii"
                  paragraph="One of a series of dashboards displaying employee metrics."
                  :images="gestaltImages"/>
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

export default {
  components: {
    LineJoiner
  },
  name: 'HomePage',
  data() {
    return {
      gestaltImages: [
        { minWidth: '1400px', src: 'alkStaffDashImg.webp', type: 'webp'},
        { minWidth: '900px', src: 'alkStaffDashImg.png', type: 'png'}
      ],
    } 
  }
};
</script>
<style scoped>
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
    height: 100vh;
  }
  /* Parallax Styles Media Query */
  @media screen and (min-width: 1000px) {
    @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
      .parallax {
        -webkit-perspective: 300px;
        perspective: 300px;
        -webkit-perspective-origin-x: 100%;
        perspective-origin-x: 100%;
        font-size: 200%;
      }
    }
  }
</style>
