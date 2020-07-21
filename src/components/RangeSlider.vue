<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <bar :barOptions="barOptions"></bar>
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
      msg: 'Vue Range Slider',
      barOptions: {
        width: '100%',
        height: '8px',
        color: 'cadetblue',
      },
    };
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    options: {
      type: Object,
    },
  },
  beforeMount() {
    this.setOptions();
  },
  methods: {
    setOptions() {
      Object.assign(this.barOptions, this.options);
    },
  },
};
</script>

<style scoped>
</style>
