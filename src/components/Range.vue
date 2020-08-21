<template>
  <div class="range-slider__range">
    <div class="range-slider__range-label" style="left: 0%">{{min}}</div>
    <div v-for="index in sliceNum"
    class="range-slider__range-label"
    :style="[{left: `${slicePercent * index}%`}, rangeStyles]"
    :key="index">
    {{min + Math.round((max - min) / (sliceNum + 1) * index)}}
    </div>
    <div class="range-slider__range-label" style="left: 100%">{{max}}</div>
  </div>
</template>

<script>
export default {
  props: ['min', 'max', 'sliceNum', 'rangeOptions'],
  data() {
    return {
      slicePercent: {
        type: Number,
      },
    };
  },
  computed: {
    rangeStyles() {
      return {
        color: this.rangeOptions.textColor,
      };
    },
  },
  beforeMount() {
    this.slicePercent = this.max / (this.sliceNum + 1);
  },
};
</script>

<style scoped>
@import '../assets/range_slider.css';
</style>
