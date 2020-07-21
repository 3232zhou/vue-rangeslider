<template>
  <div 
    ref="handle"
    :style="handleStyles"
    v-on:drag="onHandleDragged"
    v-on:click="onHandleClicked"
    draggable="true">
  </div>
</template>

<script>
export default {
  name: 'Handle',
  props: ['handleOptions'],
  computed: {
    handleStyles() {
      console.log(this.handleOptions);
      return {
        cursor: 'pointer',
        width: this.handleOptions.width,
        height: this.handleOptions.height,
        backgroundColor: this.handleOptions.color,
        left: this.handleOptions.x,
      };
    },
  },
  methods: {
    onHandleClicked() {
      // const currentColor = this.$refs.handle.style.backgroundColor;
      // if (currentColor === this.handleOptions.backgroundColor){
      //   return this.$refs.handle.style.backgroundColor = 'blue';
      // }
      // this.$refs.handle.style.backgroundColor = this.handleOptions.backgroundColor;
    },
    onHandleDragged() {
      this.moveRight();
    },
    moveLeft() {
      this.$refs.handle.style.transform += 'translateX(-1pt)';
    },
    moveRight() {
      this.$refs.handle.style.transform += 'translateX(1pt)';
    },
  },
};
</script>

<style scoped>
</style>
