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
import { moveLeft, moveRight, moveToNextHandle, moveToPrevHandle } from '../utils/keyBoardEventHandler';

export default {
  name: 'RangeSlider',
  components: {
    bar: Bar,
    handle: Handle,
    range: Range,
  },
  mixins: [],
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
    moveLeft,
    moveRight,
    moveToNextHandle,
    moveToPrevHandle,
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
    showTooltip() {
      this.clickedHandle.$refs.handle.__vue__.handleHover();
      this.clickedHandle.$refs.handle.__vue__.clicked = true;
      this.clickedHandle.$refs.handle.visibility = true;
    },
    async hideTooltip() {
      this.clickedHandle.$refs.handle.__vue__.clicked = false;
      this.clickedHandle.$refs.handle.__vue__.handleLeave();
    },
    toggleTooltip(time) {
      this.showTooltip();
      setTimeout(() => this.hideTooltip(), time);
    },
    handleClicked() {
      if (!this.clickedHandle) return;

      this.showTooltip();
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    checkFlowed(type, val) {
      if (val <= 0) {
        this.clickedHandle.$el.style.left = '0';
        this.updateFlowedValue(0);
        return true;
      }

      if (val >= this.barWidth || (type === 'keyboard' && val >= 1)) {
        this.clickedHandle.$el.style.left = 'initial';
        this.clickedHandle.$el.style.right = '0';
        this.updateFlowedValue(this.max);
        return true;
      }
      return false;
    },
    updateFlowedValue(val) {
      //underflow가 아닐 수 있음
      if (this.clickedHandle === this.$refs.handleMin) {
        this.minValue = val;
        this.minPosition = 0;
      } else if (this.clickedHandle === this.$refs.handleMax) {
        this.maxValue = val;
        this.maxPosition = 1;
      }
    },
    moveMinHandle() {
      const minPercentage = this.minPosition * 100;
      this.minValue = Math.round(this.minPosition * (this.max - this.min)) + this.min;
      this.clickedHandle.$el.style.left = `${minPercentage}%`;
    },
    moveMaxHandle() {
      const maxPercentage = this.maxPosition * 100;
      this.maxValue = Math.round(this.maxPosition * (this.max - this.min)) + this.min;
      this.clickedHandle.$el.style.left = `${maxPercentage}%`;
    },
    onDrag(e) {
      e.preventDefault();

      if (this.checkFlowed('mouse', e.clientX)) return;

      if (this.clickedHandle === this.$refs.handleMin) {
        this.minPosition = e.clientX / this.barWidth;
        this.moveMinHandle();
      }

      if (this.clickedHandle === this.$refs.handleMax) {
        this.maxPosition = e.clientX / this.barWidth;
        this.moveMaxHandle();
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

      this.hideTooltip();
      this.returnHandleValues();
    },
    handleKeyboardEvent(e) {
      e.preventDefault();

      // left arrow
      if (e.keyCode === 37) {
        this.moveLeft(e);
      }

      // right arrow
      if (e.keyCode === 39) {
        this.moveRight(e);
      }

      // down arrow, enter
      if (e.keyCode === 40 || e.keyCode === 13) {
        this.moveToNextHandle();
      }

      // backspace, upper arrow
      if (e.keyCode === 8 || e.keyCode === 38) {
        this.moveToPrevHandle();
      }
    },
  },
};
</script>

<style>
@import '../range_slider.css';
.focused {
  border: 2px solid rgba(255, 224, 156, 0.575);
}
</style>
