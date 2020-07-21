<template>
  <div :style="handleStyles"></div>
</template>

<script>
export default {
  name: 'Handle',
  props: ['handleOptions'],
  computed: {
    handleStyles() {
      return {
        width: this.handleOptions.width,
        height: this.handleOptions.height,
        backgroundColor: this.handleOptions.color,
      }
    },
  },
}
</script>

<style scoped>
</style>
