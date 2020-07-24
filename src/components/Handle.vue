<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:mouseover="handleHover">
    <div :style="tooltipStyles" :ref="tooltip" v-show="this.visibility">
      {{this.value}}
    </div>
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
    };
  },
  mounted() {
    //props에서 visibility 체크 여부 확인
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

    },
  },
};
</script>

