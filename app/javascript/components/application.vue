<template>
  <div>
    <div class="wrapper">
      <Navbar></Navbar>
      <main class="container content">
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
