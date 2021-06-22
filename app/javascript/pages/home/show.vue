<template>
  <div v-if="signedIn">
    <div v-if="signedIn" id="parallaxid" class="parallax">
      <LineJoiner sectionId="first" 
                  small
                  bodyColor="#AAEFE8" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  isLeft
                  xArrow="2"
                  layer="deep"
                  heading="Gestalt Principles"
                  subheading="Alkimii"
                  paragraph="One of a series of dashboards displaying employee metrics."
                  :image="require(`../../assets/alkStaffDashImg.png`)"/>
      <LineJoiner sectionId="second"
                  large
                  h1Color="#493EBE"
                  xArrow="2"
                  annotateColor="#CFFFFA"
                  heading="Gestalt Principles"
                  bodyColor="#7BE0BC" 
                  layer="back"
                  :image="require(`../../assets/alkStaffDashImg.png`)"/>
      <LineJoiner sectionId="third"
                  small
                  xArrow="2"
                  bodyColor="#AAEFE8" 
                  annotateColor="#CFFFFA"
                  h1Color="#493EBE"
                  h2Color="#7BE0BC"
                  pColor="#2B618A"
                  layer="base"
                  heading="Gestalt Principles"
                  subheading="Alkimii"
                  paragraph="One of a series of dashboards displaying employee metrics."
                  :image="require(`../../assets/alkStaffDashImg.png`)"/>
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
        padding-top: 300px;
      }
    }
  }
</style>
