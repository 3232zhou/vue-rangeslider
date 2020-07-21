<template>
    <div class="range-slider__bar" :style="barStyles"></div>
</template>


<script>
export default {
  name: 'Bar',
  props: {
    barWidth: {
      type: String,
      default: '100%',
    },
    barHeight: {
      type: String,
      default: '8px',
    },
  },
  computed: {
    barStyles() {
      return {
        width: this.barWidth,
        height: this.barHeight,
        backgroundColor: 'cadetblue',
      };
    },
  },
};
</script>

<style scoped>
</style>
