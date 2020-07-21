<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:mousedown="onDragStart"
    >
  </div>
</template>

<script>
export default {
  name: 'Handle',
  props: ['handleOptions'],
  data() {
    return {
      currentX: 0,
      xOffset: 0,
      initialX: 0,
      focus: false,
    }
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

      if(this.xOffset < 0){
        this.xOffset = 0;
      }
      this.setTranslate();
    },
    setTranslate() {
      this.$refs.handle.style.transform = 
      `translateX(${this.xOffset}px)`;
    }

  },
};
</script>

<style scoped>
</style>
