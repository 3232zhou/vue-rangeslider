<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <bar></bar>
  </div>
</template>

<script>
import Bar from './Bar';

export default {
  name: 'RangeSlider',
  components: {
    bar: Bar,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>
</style>
