<template>
  <span
    class="label-check clickable"
    :class="state ? 'check' : ''"
  >
    {{ name }}
    <i class="el-icon-check corner-icon" v-if="state"></i>
  </span>
</template>

<script>
export default {
  name: "labelCheck",
  props: {
    state: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.label-check {
  margin-left: 5px;
  padding: 1px 3px;
  color: rgb(255, 153, 0);
  border: 1px solid rgb(255, 153, 0);
  border-radius: 3px;
  font-size: 12px;
  user-select: none;
  position: relative;

  &.clickable {
    cursor: pointer;
  }
  &.check {
    color: green;
    border: 1px solid green;
    padding: 1px 8px 1px 3px;
  }
  .corner-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: green;
    color: white;
    font-size: 8px;
  }
}
</style>