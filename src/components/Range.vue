<template>
  <div class="range-slider__range">
    <div class="range-slider__range--min">{{min}}</div>
    <div class="range-slider__range--max">{{max}}</div>
  </div>
</template>

<script>
export default {
  props: ['min', 'max'],
}
</script>

<style scoped>
.range-slider__range {
  display: flex;
  justify-content: space-between;
}
</style>
