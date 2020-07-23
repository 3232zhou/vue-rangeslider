<template>
    <div :style="barStyles">
      <div class="range-slider__slice" v-for="i in 5" v-bind:key="i"></div>
    </div>
</template>

<script>
export default {
  name: 'Bar',
  props: ['barOptions'],
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
.range-slider__slice {
  position: relative;
  width: 5px;
  height: 100%;
  background-color:yellowgreen;
}
</style>
