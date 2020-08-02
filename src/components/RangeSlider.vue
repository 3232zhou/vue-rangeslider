<template>
  <div class='root'>
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
    <range :min='min' :max='max' :sliceNum='sliceNum'></range>
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
    range: Range
  },
  data() {
    return {
      barOptions: {
        width: '100%',
        height: '10px',
        color: 'black',
        sliceColor: '#049DBF'
      },
      handleOptions: {
        width: 12,
        height: 12,
        color: '#D93D4A'
      },
      tooltipOptions: {
        width: 20,
        height: 20,
        color: '#F2C84B',
        visibility: false
      },
      barWidth: {
        type: Number
      },
      clickedHandle: null,
      initialMin: 0,
      initialMax: 0,
      minValue: 50,
      maxValue: 70,
      minPosition: 0,
      maxPosition: 0,
    };
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    bar: {
      type: Object
    },
    handle: {
      type: Object
    },
    tooltip: {
      type: Object
    },
    sliceNum: {
      type: Number,
      default: 5
    }
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

      this.initialMin = this.minValue;
      this.initialMax = this.maxValue;

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
    },
    whichHandleClicked(e) {
      e.preventDefault();
      if (e.target === this.$refs.handleMin.$el)
        this.clickedHandle = this.$refs.handleMin;
      else if (e.target === this.$refs.handleMax.$el)
        this.clickedHandle = this.$refs.handleMax;
      else return;

      this.handleClicked();
    },
    handleClicked() {
      if(!this.clickedHandle) return;

      this.clickedHandle.$refs.handle.__vue__.handleHover();
      this.clickedHandle.$refs.handle.__vue__.clicked = true;
      this.clickedHandle.$refs.handle.visibility = true;

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    onDrag(e) {
      e.preventDefault();
      if (e.clientX <= 0) {
        this.clickedHandle.$el.style.left = '0';
        this.minValue = this.initialMin;
        return;
      }

      if (e.clientX >= this.barWidth) {
        this.clickedHandle.$el.style.left = 'initial';
        this.clickedHandle.$el.style.right = '0';
        this.maxValue = this.max;
        return;
      }

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
    },
    onDragEnd(e) {
      e.preventDefault();

      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.onDragEnd);
      this.clickedHandle.$refs.handle.__vue__.clicked = false;
      this.clickedHandle.$refs.handle.__vue__.handleLeave();
    },
    handleKeyboardEvent(e) {
      e.preventDefault();
      if (!this.clickedHandle) return;

      // left arrow
      if (e.keyCode === 37) {
      }
      // right arrow
      if (e.keyCode === 39) {
      }
    }
  }
};
</script>

<style>
@import '../range_slider.css';
</style>
