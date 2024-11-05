<template>
  <div class="main">
    <Net />
  </div>
</template>

<script>
import Net from '@/components/net/index.vue';
export default {
  name: 'mainer',
  components: {
    Net
  }
}
</script>

<style lang="scss">
.main {
  height: 100%;
}
</style>