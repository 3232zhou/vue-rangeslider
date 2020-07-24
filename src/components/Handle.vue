<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:mouseover="handleHover"
  >
    <div :style="tooltipStyles">30</div>
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
    tooltipStyles() {
      return {
        position: 'absolute',
        backgroundColor: 'aquamarine',
        top: `${this.handleOptions.width}px`,
        left: '50%',
        transform: 'translateX(-50%)',
      }
    }
  },
  methods: {
    handleHover() {
      console.log("hovered");
    },
  },
};
</script>

