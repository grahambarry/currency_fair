<template>
  <div>
    <h1>This page is behind Auth</h1>
    <hr class="invisible" />
    <div v-if="signedIn">
      <div>
        <div id="parallaxid" class="parallax">
          <LineJoiner sectionId="first"/>
          <LineJoiner sectionId="second"/>
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
  }
  /* Parallax Styles Media Query */
  @media screen and (min-width: 1000px) {
    @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
      .parallax {
        height: 1000px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-perspective: 300px;
        perspective: 300px;
        -webkit-perspective-origin-x: 100%;
        perspective-origin-x: 100%;
        font-size: 200%;
      }
    }
  }
</style>
