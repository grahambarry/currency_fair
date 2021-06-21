<template>
  <div>
    <h1>This page is behind Auth</h1>
    <hr class="invisible" />
    <div v-if="signedIn">
      <div>
        <div id="parallaxid" class="parallax">
          <LineJoiner sectionId="first" 
                      bodyColor="#AAEFE8" 
                      annotateColor="#CFFFFA"
                      h1Color="#493EBE"
                      h2Color="#7BE0BC"
                      pColor="#2B618A"
                      :flipped="false"/>
          <LineJoiner sectionId="second" 
                      bodyColor="#7BE0BC" 
                      annotateColor="#CFFFFA"
                      h1Color="#493EBE"
                      h2Color="#7BE0BC"
                      pColor="#2B618A"
                      :flipped="false"/>
          <LineJoiner sectionId="third" 
                      bodyColor="#AAEFE8" 
                      annotateColor="#CFFFFA"
                      h1Color="#493EBE"
                      h2Color="#7BE0BC"
                      pColor="#2B618A"
                      :flipped="false"/>
          <LineJoiner sectionId="fourth" 
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
                      :flipped="false"/>
        </div>
      </div>
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
      }
    }
  }
</style>
