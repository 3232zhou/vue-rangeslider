<template>
  <div :style="barStyles">
    <div :style="{backgroundColor: `${barOptions.sliceColor}`, left: '0%'}"
    :class="barOptions.sliceType === 'dot' ?
    'range-slider__slice--dot' : 'range-slider__slice'"></div>

    <div v-for="index in sliceNum"
    :class="barOptions.sliceType === 'dot' ?
    'range-slider__slice--dot' : 'range-slider__slice'"
    :style="{left: `${slicePercent * index}%`, backgroundColor: `${barOptions.sliceColor}`}"
    :key="index">
    </div>

    <div :style="{backgroundColor: `${barOptions.sliceColor}`, left: '100%'}"
    :class="barOptions.sliceType === 'dot' ?
    'range-slider__slice--dot' : 'range-slider__slice'"></div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: ['barOptions', 'max', 'sliceNum'],
  data() {
    return {
      slicePercent: {
        type: Number,
      },
    };
  },
  beforeMount() {
    this.slicePercent = 100 / (this.sliceNum + 1);
  },
  computed: {
    barStyles() {
      return {
        width: this.barOptions.width,
        height: this.barOptions.height,
        backgroundColor: this.barOptions.color,
      };
    },
  },
};
</script>

<style scoped>
@import '../assets/range_slider.css';
</style>
