<template>
  <div class='root' :style="{width: width, height: height}">
    <div class='range-slider'>
      <bar
        class='range-slider__bar'
        :barOptions='barOptions'
        ref='bar'
        :max='max'
        :sliceNum='sliceNum'
      />
      <handle
        class='range-slider__handle--min'
        :handleOptions='handleOptions'
        :tooltipOptions='tooltipOptions'
        ref='handleMin'
        :value='this.minValue'
        type='min'
      />
      <handle
        class='range-slider__handle--max'
        :handleOptions='handleOptions'
        :tooltipOptions='tooltipOptions'
        ref='handleMax'
        :value='this.maxValue'
        type='max'
      />
    </div>
    <range :min='min' :max='max' :sliceNum='sliceNum' :rangeOptions='rangeOptions'/>
  </div>
</template>

<script>
import Bar from './Bar';
import Handle from './Handle';
import Range from './Range';
import { moveLeft, moveRight, moveToNextHandle, moveToPrevHandle } from '../utils/keyBoardEventHandler';
import { keyCodes } from '../utils/keyCodes';

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
      gap: 5,
    };
  },
  props: {
    min: {
      type: Number,
      default: 0,
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
      default: 3,
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
      default: 50,
    },
    defaultMax: {
      type: Number,
      default: 70,
    },
    keyboardMove: {
      type: Boolean,
      default: false,
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
      if(this.keyboardMove) window.addEventListener('keydown', this.handleKeyboardEvent);
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
      this.clickedHandle.handleHover();
      this.clickedHandle.clicked = true;
      this.clickedHandle.visibility = true;
    },
    hideTooltip() {
      this.clickedHandle.clicked = false;
      this.clickedHandle.handleLeave();
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
        this.updateFlowedValue('under');
        return true;
      }

      if (val >= this.barWidth || (type === 'keyboard' && val >= 1)) {
        this.clickedHandle.$el.style.left = 'initial';
        this.clickedHandle.$el.style.right = '0';
        this.updateFlowedValue('over');
        return true;
      }
      return false;
    },
    updateFlowedValue(flowed) {
      if(flowed === 'under') {
        if(this.clickedHandle === this.$refs.handleMin) {
          this.minValue = 0;
          this.minPosition = 0;
        } else {
          this.maxValue = 0;
          this.maxPosition = 0;
        }
      } else {
        if(this.clickedHandle === this.$refs.handleMin) {
          this.minValue = this.max;
          this.minPosition = 1;
        } else {
          this.maxValue = this.max;
          this.maxPosition = 1;
        }
      }
      this.returnHandleValues();
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

      const keyCode = keyCodes.getKeyByValue(e.keyCode);
      if (keyCode === 'LEFT') return this.moveLeft();
      if (keyCode === 'RIGHT') return this.moveRight();
      if (keyCode === 'ENTER' || keyCode === 'DOWN') return this.moveToNextHandle();
      if (keyCode === 'BACK' || keyCode === 'UP') return this.moveToPrevHandle();
    },
  },
};
</script>

<style>
@import '../assets/range_slider.css';
</style>
