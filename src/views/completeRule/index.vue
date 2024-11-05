<template>
  <div class="complete-rule">
    <div class="commit-btn" @click="visible = true">
      <i class="el-icon-share"></i>
    </div>

    <el-dialog
      title="标题占位"
      :visible.sync="visible"
      width="95%"
      style="margin-top: -30px;"
    >
      <CanvasOne />
    </el-dialog>
  </div>
</template>

<script>
import CanvasOne from './canvasone.vue';
export default {
  name: 'completeRule',
  components: {
    CanvasOne
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.complete-rule {

  .commit-btn {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 10px;
    background-color: white;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #eee;
    box-shadow: 1px 1px 3px #000;
    font-size: 20px;
  }
}
</style>