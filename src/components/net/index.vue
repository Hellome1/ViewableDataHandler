<template>
  <div class="net">
    <Point style="left: 80px; top: 10px; position: absolute;"/>

    <Point style="left: 20px; top: 100px; position: absolute;" name="用药闭环" code="MedicalOrderLoop" />


    <Point style="left: 350px; top: 10px; position: absolute;" name="检查" code="PACS"/>
    <Point style="left: 600px; top: 10px; position: absolute;" name="检验" code="LIS" />
  </div>
</template>

<script>
import Point from '@/components/point/index.vue';
export default {
  name: 'net',
  components: {
    Point
  }
}
</script>

<style lang="scss">
.net {
  padding: 10px;
  background-color: #eee;
  position: relative;
  height: 100%;
}
</style>