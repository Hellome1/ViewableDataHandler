<template>
  <div class="canvas-one">
    <el-row>
      <el-col :span="6">
        <dir style="padding: 10px;">
          <div class="tool-bar-line">
            <span class="icon-item" @click="last">
              <i class="el-icon-back"></i>
              <span>返回</span>
            </span>
          </div>
          <List v-show="leftListShowIndex === 1"/>
          <PostList v-show="leftListShowIndex === 2" />
        </dir>
      </el-col>
      <el-col :span="18">
        <div class="logic layoutFlex">
          <LogicIfEnv />
          <IfPool />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/list/index.vue';
import PostList from '@/components/list/postList.vue';
import LogicIfEnv from '@/components/logic/logicif.vue';
import IfPool from '@/components/logic/ifpool.vue';
const arr = [];
export default {
  name: 'canvasOne',
  provide() {
    return {
      setListShowIndex: (index) => {
        arr.push(this.leftListShowIndex);
        this.leftListShowIndex = index; 
      }
    }
  },
  components: {
    List,
    PostList,
    LogicIfEnv,
    IfPool
  },
  data() {
    return {
      leftListShowIndex: 1
    }
  },
  methods: {
    last() {
      let i = arr.pop();
      console.log('lastIndex:', i);
      if (i) {
        this.leftListShowIndex = i;
      }
    }
  }
}
</script>

<style lang="scss">
.canvas-one {
  height: 600px;
  padding: 10px 15px;

  .tool-bar-line {
    height: 24px;
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;

    .icon-item {
      cursor: pointer;

      i {
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>