<template>
  <div class="range-slider__range">
    <div
    class="range-slider__range-label"
    v-for="index in sliceNum + 1" :key="index"
    :style="[{left: `${slicePercent * (index-1) * (100 / max)}%`,}, rangeStyles]"
    >
      {{min + (index - 1) * (max - min) / sliceNum}}
    </div>
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
    this.slicePercent = this.max / this.sliceNum;
  },
};
</script>

<style scoped>
@import '../range_slider.css';
</style>
