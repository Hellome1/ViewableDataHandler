<template>
  <div class="env">
    <div class="rect">
      <div class="env-item" v-for="(itm, key) in obj" :key="key">
        <span style="font-weight: bold">{{dict[key]}}：</span><span>{{itm}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus.js';
const dict = {
  hosPatRegNo: '登记号',
  encId: '就诊号',
  pacsExamDept: '检查科室'
};
export default {
  name: "env",
  data() {
    return {
      dict: dict,
      obj: {
        hosPatRegNo: '0000813452',
        encId: '0003325',
        pacsExamDept: '超声科'
      }
    }
  },
  mounted() {
    bus.$on('ENV', cb => cb.call(this));
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.rect {
  font-size: 14px;
  padding: 5px;
  position: fixed;
  z-index: 2999;
  right: 25px;
  top: 25px;
  border: 1px solid black;
  width: 180px;
  height: 250px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>