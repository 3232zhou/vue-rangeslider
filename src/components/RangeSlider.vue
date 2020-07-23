<template>
  <div class="root">
    <div class="range-slider">
      <bar class="range-slider__bar" :barOptions="barOptions" ref="bar"></bar>
      
      <div class="range-slider__handle">
        <handle class="range-slider__handle--min" :handleOptions="handleOptions" ref="handleMin" :barWidth="barWidth"></handle>
      </div>
    </div>
    <range :min="min" :max="max"></range>
  </div>
</template>

<script>
import Bar from './Bar';
import Handle from './Handle';
import Range from './Range';

export default {
  name: 'RangeSlider',
  components: {
    bar: Bar,
    handle: Handle,
    range: Range,
  },
  data() {
    return {
      barOptions: {
        width: '100%',
        height: '8px',
        color: 'cadetblue',
      },
      handleOptions: {
        width: '12px',
        height: '12px',
        color: 'chocolate',
        value: 30, // default value
      },
      barWidth: {
        type: Number,
      }
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
  mounted() {
    this.barWidth = this.$refs.bar.$el.getBoundingClientRect().width;
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
  position: relative;
  align-items: center;
}
.range-slider__bar {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.range-slider__handle {
  display: flex;
}
.range-slider__handle--min {
  position: relative;
}
.range-slider__label {
  display: flex;
  justify-content: space-between;
}
</style>
