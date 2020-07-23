<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:mousedown="onDragStart"
    >
    <div>
     {{this.currentVal}}
    </div>
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
  mounted() {
    this.xOffset = this.handleOptions.value;
    this.setTranslate();

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      // left arrow
      if (e.keyCode === 37) {
        if(this.xOffset <= 0) {
          this.xOffset = 0;
          return this.setTranslate();
        }
        this.xOffset -= 10;
        this.setTranslate();
      }
      // right arrow
      if (e.keyCode === 39) {
        this.xOffset += 10;
        this.setTranslate();
      }
    });
  },
  computed: {
    handleStyles() {
      // console.log(this.handleOptions);
      return {
        cursor: 'pointer',
        width: this.handleOptions.width,
        height: this.handleOptions.height,
        backgroundColor: this.handleOptions.color,
      };
    },
  },
  methods: {
    onDragStart(e) {
      this.initialX = e.pageX - this.xOffset;
      this.focus = true;
      document.addEventListener('mousemove', this.onHandleDrag);
      document.addEventListener('mouseup', this.onDragEnd);
    },
    onDragEnd(e) {
      e.preventDefault();
      this.initialX = this.currentX;
      document.removeEventListener('mousemove', this.onHandleDrag);
      document.removeEventListener('mouseup', this.onDragEnd);
    },
    onHandleDrag(e) {
      e.preventDefault();
      this.currentX = e.pageX - this.initialX;
      this.xOffset = this.currentX;

      if (this.xOffset < 0) {
        this.xOffset = 0;
      }

      if(this.xOffset > this.barWidth){
        this.xOffset = this.barWidth;
      }
      this.setTranslate();
    },
    setTranslate() {
      const barPosition = (this.xOffset / this.barWidth);
      this.currentVal = Math.round(100 * barPosition);
      this.$refs.handle.style.transform = `translateX(${this.xOffset}px)`;
    },
  },
};
</script>

<style scoped>
</style>
