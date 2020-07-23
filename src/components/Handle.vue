<template>
  <div 
    ref="handle"
    :style="handleStyles"
    >
    <!-- <div>
     {{this.currentVal}}
    </div> -->
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
  mounted() {
    this.xOffset = this.handleOptions.value;
    this.setTranslate();
  },
  computed: {
    handleStyles() {
      // console.log(this.handleOptions);
      return {
        cursor: 'pointer',
        width: this.handleOptions.width,
        height: this.handleOptions.height,
        backgroundColor: this.handleOptions.color,
      };
    },
  },
  methods: {
    setTranslate() {
      const barPosition = (this.xOffset / this.barWidth);
      this.currentVal = Math.round(100 * barPosition);
      this.$refs.handle.style.transform = `translateX(${this.xOffset}px)`;
    },
  },
};
</script>

<style scoped>
</style>
