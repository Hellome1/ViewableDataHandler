<template>
  <div id="app">
    <!-- 大画布 -->
    <div class="bigCanvas">
      <!-- 登记号输入，发送   时间轴 -->
      <div class="upperArea">
        <Head />
      </div>
      <!-- 医嘱，用药，检查，检验等配置 -->
      <div class="downArea">
        <Main />
      </div>

      <div class="white-space">
        <WhiteSpace />
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/views/head.vue';
import Main from '@/views/main.vue';
import WhiteSpace from '@/views/whiteSpace.vue';
export default {
  name: 'app',
  components: {
    Head,
    Main,
    WhiteSpace
  }
}
</script>

<style lang="scss">
.logic-show {
  position: fixed;
  left: 20px;
  top: 30px;
}
</style>
