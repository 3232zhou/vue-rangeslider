<template>
  <div class="root">
    <div class="range-slider">
      <bar class="range-slider__bar" :barOptions="barOptions"></bar>
      <handle class="range-slider__handle" :handleOptions="handleOptions"></handle>
    </div>
  </div>
</template>

<script>
import Bar from './Bar';
import Handle from './Handle';

export default {
  name: 'RangeSlider',
  components: {
    bar: Bar,
    handle: Handle,
  },
  data() {
    return {
      msg: 'Vue Range Slider',
      barOptions: {
        width: '100%',
        height: '8px',
        color: 'cadetblue',
      },
      handleOptions: {
        width: '12px',
        height: '12px',
        color: 'chocolate',
        x: '0pt',
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
    bar: {
      type: Object,
    },
    handle: {
      type: Object,
    },
  },
  beforeMount() {
    this.setOptions();
  },
  methods: {
    setOptions() {
      Object.assign(this.barOptions, this.bar);
      Object.assign(this.handleOptions, this.handle);
    },
  },
};
</script>

<style scoped>
.range-slider {
  display: flex;
  align-items: center;
}
.range-slider__bar {
  position: absolute;
}
.range-slider__handle {
  position: relative;
}
</style>
