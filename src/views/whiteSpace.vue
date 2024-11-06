<template>
  <!-- 空白位置，用于放置位于顶部的元素 -->
  <div class="white-space">
    <Env />

    <CompleteRule />

    <Intro />

    <PosterUse />

    <Drawer />
  </div>
</template>

<script>
import Env from '@/components/env/index.vue';
import CompleteRule from '@/views/completeRule/index.vue';
import Intro from '@/components/intro/index.vue';
import PosterUse from '@/components/poster/index.vue';
import Drawer from './drawer.vue';
export default {
  name: 'whiteSpace',
  components: {
    Env,
    CompleteRule,
    Intro,
    PosterUse,
    Drawer
  }
}
</script>

<style lang="scss">

</style>