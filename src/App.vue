<template>
  <div id="app">
    <RangeSlider></RangeSlider>
  </div>
</template>

<script>
import RangeSlider from './components/RangeSlider';

export default {
  name: 'App',
  components: {
    RangeSlider,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
