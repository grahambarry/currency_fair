<template>
  <div>
    <div class="wrapper">
      <Navbar :topValue="topValue"></Navbar>
      <main class="main-container">
        <router-view @emitTop="setTop"/>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar.vue';

export default {
  name: 'ApplicationRootComponent',
  components: { Navbar },
  data () {
    return {
      topValue: '0px'
    }
  },
  methods: {
    setTop (top) {
      console.log('topXXXXXXXX ' + top)
      this.topValue = top
    }
  }
};
</script>
<style>
  .main-container {
    z-index: 3;
  }
</style>