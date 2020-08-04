<template>
  <div
    ref="handle"
    :style="handleStyles"
    v-on:mouseenter="handleHover"
    v-on:mouseleave="handleLeave"
    >
    <transition name="fade">
      <div class="range-slider__tooltip" :style="tooltipStyles" v-show="this.visibility">
        {{this.value}}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Handle',
  props: ['handleOptions', 'tooltipOptions', 'value'],
  data() {
    return {
      currentX: 0,
      xOffset: 0,
      initialX: 0,
      currentVal: 0,
      defaultHandleValue: {

      },
      defaultTooltipValue: {

      },
      visibility: true,
      clicked: false,
    };
  },
  beforeMount() {
    if (!this.tooltipOptions.visibility) this.visibility = false;
  },
  computed: {
    handleStyles() {
      return {
        cursor: 'pointer',
        width: this.handleOptions.width,
        height: this.handleOptions.height,
        backgroundColor: this.handleOptions.color,
        border: this.handleOptions.border,
        borderRadius: this.handleOptions.borderRadius,
      };
    },
    tooltipStyles() {
      return {
        backgroundColor: this.tooltipOptions.color,
        top: this.handleOptions.width,
        width: this.tooltipOptions.width,
        height: this.tooltipOptions.height,
        lineHeight: this.tooltipOptions.height,
        border: this.tooltipOptions.border,
        borderRadius: this.tooltipOptions.borderRadius,
      };
    },
  },
  methods: {
    handleHover() {
      if (!this.tooltipOptions.visibility) this.visibility = true;
    },
    handleLeave() {
      if (this.clicked) return;
      if (!this.tooltipOptions.visibility) this.visibility = false;
    },
  },
};
</script>

<style scoped>
@import '../range_slider.css';
</style>

