<template>
  <div class="drawer-switch-item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'drawerSwitchItem',
  props: {
    index: {
      type: Number
    },
    curIndex: {
      type: Number
    },
    width: {
      type: Number
    }
  },
  computed: {
    style() {
      return { transform: `translateX(${(this.index - this.curIndex) * this.width + 'px'})` }
    }
  }
}
</script>

<style lang="scss">
.drawer-switch-item {
  transition: 0.3s;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>