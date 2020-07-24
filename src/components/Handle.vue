<template>
  <div 
    ref="handle"
    :style="handleStyles"
  >
  </div>

</template>

<script>
export default {
  name: 'Handle',
  props: ['handleOptions', 'barWidth'],
  data() {
    return {
      currentX: 0,
      xOffset: 0,
      initialX: 0,
      currentVal: 0,
    };
  },
  computed: {
    handleStyles() {
      // console.log(this.handleOptions);
      return {
        cursor: 'pointer',
        width: `${this.handleOptions.width}px`,
        height: `${this.handleOptions.height}px`,
        backgroundColor: this.handleOptions.color,
      };
    },
  },
};
</script>

<style scoped>
</style>
