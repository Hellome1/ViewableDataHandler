<template>
  <div class="intro">
    <h5>介绍、使用说明</h5>
  </div>
</template>

<script>
export default {
  name: 'intro'
}
</script>

<style lang="scss">
.intro {
  position: fixed;
  z-index: 2999;
  right: 10px;
  bottom: 20px;
  width: 200px;
  height: 280px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: rgba(244, 244, 230, 0.8);
  padding: 10px;
  text-align: center;
}
</style>