<template>
  <div class="root">
    <div class="range-slider">
      <bar class="range-slider__bar" :barOptions="barOptions" ref="bar"></bar>
    
      <div class="range-slider__handle">
        <handle :handleOptions="handleOptions" ref="handleMin" :barWidth="barWidth"></handle>
        <handle :handleOptions="handleOptions" ref="handleMax" :barWidth="barWidth"></handle>
      </div>
    </div>
    <range :min="min" :max="max"></range>
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
        height: '8px',
        color: 'cadetblue',
      },
      handleOptions: {
        width: '12px',
        height: '12px',
        color: 'chocolate',
        value: 30, // default value
      },
      barWidth: {
        type: Number,
      },
      clickedHandle: null,
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
  },
  beforeMount() {
    this.setOptions();
  },
  mounted() {
    this.barWidth = this.$refs.bar.$el.getBoundingClientRect().width;
    document.addEventListener('mousedown', this.whichHandleClicked);
    this.addKeyboardEvent();
  },
  methods: {
    setOptions() {
      Object.assign(this.barOptions, this.bar);
      Object.assign(this.handleOptions, this.handle);
    },
    whichHandleClicked(e) {
      e.preventDefault();
      if(e.target === this.$refs.handleMin.$el) this.clickedHandle = this.$refs.handleMin;
      else if(e.target === this.$refs.handleMax.$el) this.clickedHandle = this.$refs.handleMax;
      else return;

      console.log(this.clickedHandle.$el);

      this.clickedHandle.initialX = e.pageX - this.clickedHandle.xOffset;
      this.clickedHandle = this.clickedHandle;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    onDrag(e) {
      e.preventDefault();
      this.clickedHandle.currentX = e.pageX - this.clickedHandle.initialX;
      this.clickedHandle.xOffset = this.clickedHandle.currentX;

      if (this.clickedHandle.xOffset < 0) {
        this.clickedHandle.xOffset = 0;
      }

      if(this.clickedHandle.xOffset > this.barWidth){
        this.clickedHandle.xOffset = this.barWidth;
      }
      this.setTranslate();
      console.log("handle drag!");
    },
    onDragEnd(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.onDragEnd);
      console.log("end..");
    },
    setTranslate() {
      const barPosition = (this.clickedHandle.xOffset / this.barWidth);
      this.currentVal = Math.round(100 * barPosition);
      this.clickedHandle.$el.style.transform = `translateX(${this.clickedHandle.xOffset}px)`;
    },
    addKeyboardEvent() {
      window.addEventListener('keydown', (e) => {
        e.preventDefault();
        if(!this.clickedHandle) return;
        // left arrow
        if (e.keyCode === 37) {
          if(this.clickedHandle.xOffset <= 0) {
            this.clickedHandle.xOffset = 0;
            this.setTranslate();
            return;
          }
          this.clickedHandle.xOffset -= 10;
          this.setTranslate();
        }
        // right arrow
        if (e.keyCode === 39) {

          if(this.clickedHandle.xOffset >= this.barWidth){
            console.log("overflow!");
            return;
          }
          this.clickedHandle.xOffset += 10;
          this.setTranslate();
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
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.range-slider__handle {
  display: flex;
}
.range-slider__handle--min {
  position: relative;
}
.range-slider__label {
  display: flex;
  justify-content: space-between;
}
</style>
