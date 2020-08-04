<template>
  <div :style="barStyles">
    <div class="range-slider__slice"
    v-for="index in sliceNum + 1"
    :style="{
      left: `${slicePercent * (index-1) * (100 / max)}%`,
      backgroundColor: `${barOptions.sliceColor}`}"
    :key="index">
    </div>
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
    this.slicePercent = this.max / this.sliceNum;
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
@import '../range_slider.css';
</style>
