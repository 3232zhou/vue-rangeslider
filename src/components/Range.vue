<template>
  <div class="range-slider__range">
    <div 
    class="test"
    v-for="index in sliceNum + 1" :key="index" 
    :style="{left: `${slicePercent * (index-1) * (100 / max)}%`}"
    >
      {{min + (index - 1) * (max - min) / sliceNum}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['min', 'max', 'sliceNum'],
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
}
</script>

<style scoped>
.range-slider__range {
  position: relative;
}
.test {
  position: absolute;
}
</style>
