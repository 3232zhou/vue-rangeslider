<template>
  <div class='root' :style="{width: width, height: height}">
    <div class='range-slider'>
      <bar
        class='range-slider__bar'
        :barOptions='barOptions'
        ref='bar'
        :max='max'
        :sliceNum='sliceNum'
      ></bar>
      <handle
        class='range-slider__handle--min'
        :handleOptions='handleOptions'
        :tooltipOptions='tooltipOptions'
        ref='handleMin'
        :value='this.minValue'
        type='min'
      ></handle>
      <handle
        class='range-slider__handle--max'
        :handleOptions='handleOptions'
        :tooltipOptions='tooltipOptions'
        ref='handleMax'
        :value='this.maxValue'
        type='max'
      ></handle>
    </div>
    <range :min='min' :max='max' :sliceNum='sliceNum' :rangeOptions='rangeOptions'></range>
  </div>
</template>

<script>
import Bar from './Bar';
import Handle from './Handle';
import Range from './Range';

export default {
  name: 'RangeSlider',
  components: {
    bar: Bar,
    handle: Handle,
    range: Range,
  },
  data() {
    return {
      barOptions: {
        width: '100%',
        height: '10px',
        color: 'black',
        sliceColor: '#049DBF',
      },
      handleOptions: {
        width: '12px',
        height: '12px',
        color: '#D93D4A',
        borderRadius: '50%',
      },
      tooltipOptions: {
        width: '20px',
        height: '20px',
        color: '#F2C84B',
        visibility: false,
        borderRadius: '30%',
        textColor: 'white',
      },
      barWidth: {
        type: Number,
      },
      rangeOptions: {
        textColor: 'black',
      },
      clickedHandle: null,
      minPosition: 0,
      maxPosition: 0,
      minValue: 0,
      maxValue: 0,
      gap: 3,
    };
  },
  props: {
    min: {
      type: Number,
      default: 7,
    },
    max: {
      type: Number,
      default: 100,
    },
    bar: {
      type: Object,
    },
    handle: {
      type: Object,
    },
    tooltip: {
      type: Object,
    },
    range: {
      type: Object,
    },
    sliceNum: {
      type: Number,
      default: 5,
    },
    width: {
      type: String,
      default: '50%',
    },
    height: {
      type: String,
      default: '',
    },
    defaultMin: {
      type: Number,
      default: 40,
    },
    defaultMax: {
      type: Number,
      default: 75,
    },
  },
  beforeMount() {
    this.setOptions();
  },
  mounted() {
    this.setInitialHandleValue();
    this.addEventListeners();
  },
  methods: {
    addEventListeners() {
      document.addEventListener('mousedown', this.whichHandleClicked);
      window.addEventListener('resize', this.setInitialHandleValue);
      window.addEventListener('keydown', this.handleKeyboardEvent);
    },
    setInitialHandleValue() {
      this.barWidth = this.$refs.bar.$el.getBoundingClientRect().width;

      this.minValue = this.defaultMin;
      this.maxValue = this.defaultMax;

      this.minPosition =
        Math.abs(this.min - this.minValue) / (this.max - this.min);
      this.maxPosition =
        Math.abs(this.min - this.maxValue) / (this.max - this.min);

      const minPercentage = this.minPosition * 100;
      const maxPercentage = this.maxPosition * 100;

      this.$refs.handleMin.$el.style.left = `${minPercentage}%`;
      this.$refs.handleMax.$el.style.left = `${maxPercentage}%`;
    },
    setOptions() {
      Object.assign(this.barOptions, this.bar);
      Object.assign(this.handleOptions, this.handle);
      Object.assign(this.tooltipOptions, this.tooltip);
      Object.assign(this.rangeOptions, this.range);
    },
    whichHandleClicked(e) {
      e.preventDefault();
      if (e.target === this.$refs.handleMin.$el) {
        this.clickedHandle = this.$refs.handleMin;
      } else if (e.target === this.$refs.handleMax.$el) {
        this.clickedHandle = this.$refs.handleMax;
      } else return;

      this.handleClicked();
    },
    handleClicked() {
      if (!this.clickedHandle) return;

      this.clickedHandle.$refs.handle.__vue__.handleHover();
      this.clickedHandle.$refs.handle.__vue__.clicked = true;
      this.clickedHandle.$refs.handle.visibility = true;

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    checkFlowed(val) {
      if (val <= 0) {
        this.clickedHandle.$el.style.left = '0';
        this.updateFlowedValue(0);
        return true;
      }

      if (val >= this.barWidth) {
        this.clickedHandle.$el.style.left = 'initial';
        this.clickedHandle.$el.style.right = '0';
        this.updateFlowedValue(this.max);
        return true;
      }

      return false;
    },
    updateFlowedValue(val) {
      if(this.clickedHandle === this.$refs.handleMin){
        this.minValue = val;
      }else if(this.clickedHandle === this.$refs.handleMax){
        this.maxValue = val;
      }else return;
    },
    onDrag(e) {
      e.preventDefault();

      if(this.checkFlowed(e.clientX)) return;

      if (this.clickedHandle.$el.getAttribute('type') === 'max') {
        this.maxPosition = e.clientX / this.barWidth;
        const maxPercentage = this.maxPosition * 100;
        this.maxValue =
          Math.round(this.maxPosition * (this.max - this.min)) + this.min;
        this.clickedHandle.$el.style.left = `${maxPercentage}%`;
      }

      if (this.clickedHandle.$el.getAttribute('type') === 'min') {
        this.minPosition = e.clientX / this.barWidth;
        const minPercentage = this.minPosition * 100;
        this.minValue =
          Math.round(this.minPosition * (this.max - this.min)) + this.min;
        this.clickedHandle.$el.style.left = `${minPercentage}%`;
      }

      this.returnHandleValues();
    },
    returnHandleValues() {
      this.$emit('getMinValue', this.getMinValue());
      this.$emit('getMaxValue', this.getMaxValue());
    },
    getMinValue() {
      return this.minValue;
    },
    getMaxValue() {
      return this.maxValue;
    },
    onDragEnd(e) {
      e.preventDefault();

      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.onDragEnd);
      this.clickedHandle.$refs.handle.__vue__.clicked = false;
      this.clickedHandle.$refs.handle.__vue__.handleLeave();

      this.returnHandleValues();
    },
    handleKeyboardEvent(e) {
      e.preventDefault();
      // backspace : 8

      // left arrow
      if (e.keyCode === 37) {
        if(!this.clickedHandle) {
          console.log(' left : no clicked handle ');
          return;
        }

        // 모듈화 하기!!
        // check flowed value
        // animation (tooltip 살짝 보이기)
        if(this.clickedHandle === this.$refs.handleMin) {
          this.minPosition -= (this.gap / this.max);
          const minPercentage = this.minPosition * 100;
          this.minValue = Math.round(this.minPosition * (this.max - this.min) + this.min);
          this.clickedHandle.$el.style.left = `${minPercentage}%`;
        }else {
          this.maxPosition -= (this.gap / this.max);
          const maxPercentage = this.maxPosition * 100;
          this.maxValue = Math.round(this.maxPosition * (this.max - this.min) + this.min);
          this.clickedHandle.$el.style.left = `${maxPercentage}%`;
        }
        this.returnHandleValues();
      }
      
      // right arrow
      if (e.keyCode === 39) {
        
        if(!this.clickedHandle) {
          console.log(' right : no clicked handle ');
          return;
        }

        if(this.clickedHandle === this.$refs.handleMin) {
          this.minPosition += (this.gap / this.max);
          const minPercentage = this.minPosition * 100;
          this.minValue = Math.round(this.minPosition * (this.max - this.min) + this.min);
          this.clickedHandle.$el.style.left = `${minPercentage}%`;
        }else {
          this.maxPosition += (this.gap / this.max);
          const maxPercentage = this.maxPosition * 100;
          this.maxValue = Math.round(this.maxPosition * (this.max - this.min) + this.min);
          this.clickedHandle.$el.style.left = `${maxPercentage}%`;
        }

        this.returnHandleValues();
      }

      //down arrow, enter
      if (e.keyCode === 40 || e.keyCode === 13) {
        if (!this.clickedHandle) {
          this.clickedHandle = this.$refs.handleMin;
          this.clickedHandle.$el.classList.add('focused');
        } else {
          this.clickedHandle = this.$refs.handleMax;
          this.$refs.handleMin.$el.classList.remove('focused');
          this.clickedHandle.$el.classList.add('focused');
        }
      }
    },
  },
};
</script>

<style>
@import '../range_slider.css';
.focused {
  border: 5px solid yellowgreen;
}
</style>
