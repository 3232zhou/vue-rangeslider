<template>
    <div :style="barStyles"></div>
</template>


<script>
export default {
  name: 'Bar',
  props: ['barOptions'],
  computed: {
    barStyles() {
      return {
        width: this.barOptions.width,
        height: this.barOptions.height,
        backgroundColor: this.barOptions.color,
      };
    },
  },
};
</script>

<style scoped>
</style>
