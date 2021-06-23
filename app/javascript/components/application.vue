<template>
  <div>
    <div class="wrapper">
      <Navbar></Navbar>
      <main class="main-container">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar.vue';

export default {
  name: 'ApplicationRootComponent',
  components: { Navbar },
};
</script>
<style>
  .main-container {
    z-index: 3;
  }
</style>