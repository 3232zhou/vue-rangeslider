<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:mouseenter="handleHover"
    v-on:mouseleave="handleLeave"
    >
    <transition name="fade">
      <div :style="tooltipStyles" v-show="this.visibility">
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
      // console.log(this.handleOptions);
      return {
        cursor: 'pointer',
        width: `${this.handleOptions.width}px`,
        height: `${this.handleOptions.height}px`,
        backgroundColor: this.handleOptions.color,
      };
    },
    //object assign 하기
    tooltipStyles() {
      return {
        position: 'absolute',
        backgroundColor: `${this.tooltipOptions.color}`,
        top: `${this.handleOptions.width}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${this.tooltipOptions.width}px`,
        height: `${this.tooltipOptions.height}px`,
      }
    }
  },
  methods: {
    handleHover() {
      if(!this.tooltipOptions.visibility) this.visibility = true;
    },
    handleLeave() {
      if(this.clicked) return;
      if(!this.tooltipOptions.visibility) this.visibility = false;
    }
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

