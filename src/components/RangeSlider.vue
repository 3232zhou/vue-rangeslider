<template>
  <div class="root">
    <div class="range-slider">
      <bar class="range-slider__bar" :barOptions="barOptions" ref="bar" :max="max" :sliceNum="sliceNum"></bar>
      <handle 
      class="range-slider__bar--min"
      :handleOptions="handleOptions" 
      :tooltipOptions="tooltipOptions" 
      ref="handleMin"
      :value="this.minValue"
      type="min"></handle>

      <handle 
      class="range-slider__bar--max"
      :handleOptions="handleOptions" 
      :tooltipOptions="tooltipOptions" 
      ref="handleMax" 
      :value="this.maxValue"
      type="max"></handle>
    </div>
    <range :min="min" :max="max" :sliceNum="sliceNum"></range>
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
      },
      handleOptions: {
        width: 12,
        height: 12,
        color: 'chocolate',
      },
      tooltipOptions: {
        width: 12,
        height: 12,
        color: 'aquamarine',
        visibility: false,
      },
      barWidth: {
        type: Number,
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
    sliceNum: {
      type: Number,
      default: 5,
    },
  },
  beforeMount() {
    this.setOptions();
  },
  mounted() {
    this.barWidth = this.$refs.bar.$el.getBoundingClientRect().width;
    this.setInitialHandleValue();
    document.addEventListener('mousedown', this.whichHandleClicked);
    this.addKeyboardEvent();
  },
  methods: {
    setInitialHandleValue() {
      this.initialMin = this.minValue;
      this.initialMax = this.maxValue;

      this.minPosition = this.minValue / (this.max - this.min);
      this.maxPosition = this.maxValue / (this.max - this.min);

      if(this.minPosition >= 1) this.minPosition -= 1;
      if(this.maxPosition >= 1) this.maxPosition -= 1;

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
      if(e.target === this.$refs.handleMin.$el) this.clickedHandle = this.$refs.handleMin;
      else if(e.target === this.$refs.handleMax.$el) this.clickedHandle = this.$refs.handleMax;
      else return;

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

      if(e.clientX >= this.barWidth){
        this.clickedHandle.$el.style.left = 'initial';
        this.clickedHandle.$el.style.right = '0';
        this.maxValue = this.max;
        return;
      }
      
      if(this.clickedHandle.$el.getAttribute('type') === 'max') {
        this.maxPosition = e.clientX / this.barWidth;
        const maxPercentage = this.maxPosition * 100;
        this.maxValue = Math.round(this.maxPosition * (this.max - this.min));
        this.clickedHandle.$el.style.left = `${maxPercentage}%`;
      }

      if(this.clickedHandle.$el.getAttribute('type') === 'min') {
        this.minPosition = e.clientX / this.barWidth;
        const minPercentage = this.minPosition * 100;
        
        this.minValue = Math.round(this.minPosition * (this.max - this.min));
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
    addKeyboardEvent() {
      window.addEventListener('keydown', (e) => {
        e.preventDefault();
        if(!this.clickedHandle) return;

        // left arrow
        if (e.keyCode === 37) {
        }
        // right arrow
        if (e.keyCode === 39) {
        }
      });
    }
  },
};
</script>

<style scoped>
.range-slider {
  display: flex;
  position: relative;
  align-items: center;
}
.range-slider__bar {
  display: flex;
  flex-direction: row;
  position: relative;
}
.range-slider__label {
  display: flex;
  justify-content: space-between;
}
.range-slider__bar--min {
  position: absolute;
}
.range-slider__bar--max {
  position: absolute;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
