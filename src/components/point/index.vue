<template>
  <div class="point">
    <div>
      <div class="point-itm" @click="seeThisPoint"></div>
      <h5>{{name}}</h5>
      <h5>{{code}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'point',
  props: {
    name: {
      type: String,
      default: '用药医嘱'
    },
    code: {
      type: String,
      default: 'MedicalOrder'
    }
  },
  data() {
    return {
      
    }
  },
  created() {
    // if (this.name === '用药医嘱') this.seeThisPoint();
  },
  methods: {
    seeThisPoint() {
      global_state.drawer.drawerVisible = true;
      global_state.drawer.code = this.code;
      global_state.drawer.title = this.name;

      let reqs = dict1[this.code].handler || [];
      global_state.list.list = reqs;
    }
  }
}
</script>

<style lang="scss">
.point {
  text-align: center;
  .point-itm {
    width: 30px;
    height: 30px;
    display: inline-block;
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>