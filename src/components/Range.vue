<template>
  <div class="range-slider__range">
    <div 
    class="range-slider__range-label"
    v-for="index in sliceNum + 1" :key="index" 
    :style="{left: `${slicePercent * (index-1) * (100 / max)}%`}"
    >
      {{min + (index - 1) * (max - min) / sliceNum}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['min', 'max', 'sliceNum', 'sliceOptions'],
  data() {
    return {
      slicePercent: {
        type: Number
      },
    }
  },
  beforeMount() {
    this.slicePercent = this.max / this.sliceNum;
  },
  computed: {
    sliceStyles() {
      return {
        width: this.sliceOptions.width,
        height: this.sliceOptions.height,
        backgroundColor: this.sliceOptions.color,
      }
    }
  }
}
</script>

<style scoped>
.range-slider__range {
  position: relative;
}
.range-slider__range-label {
  position: absolute;
}
</style>
