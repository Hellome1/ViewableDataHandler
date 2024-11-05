<template>
  <div class="logic-move-to-area">
    <div class="upper">
      <div class="layoutFlex">
        <div class="layoutFlex-left">
          <div class="head">
            <el-input v-model="ruleTitle" placeholder="请输入规则名称" style="width: 150px;" size="mini"></el-input>
          </div>
        </div>
        <div class="layoutFlex-right">
          <div class="fns">
            <i class="el-icon-refresh-left" title="重置" @click="reset"></i>
            <i class="el-icon-check" title="加入到规则池" @click="addToIfPool"></i>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="down">
      <div class="logic-itm-list" v-for="(itm, i) in arr" :key="i">
        <div class="logic-item">
          <div class="logic-item-row">
            <el-select v-model="itm.left" placeholder="请选择" @change="checkRowResult(itm)">
              <el-option
                v-for="(l, i) in leftOpt"
                :key="i"
                :label="l.label"
                :value="l.value"
              ></el-option>
            </el-select>
          </div>

          <div class="logic-item-row">
            <el-select v-model="itm.mid" placeholder="请选择" @change="checkRowResult(itm)">
              <el-option
                v-for="(m, i) in midOpt"
                :key="i"
                :label="m.label"
                :value="m.value"
              ></el-option>
            </el-select>
          </div>

          <div class="logic-item-row">
            <el-input v-model="itm.right" @input="checkRowResult(itm)"></el-input>
          </div>

          <div class="logic-item-result">
            <i
              v-show="itm.left && itm.mid"
              :class="itm.result ? 'el-icon-check success' : 'el-icon-close failure'"
            ></i>
          </div>
        </div>
      </div>

      <div
        class="logic-result"
        :class="result ? 'success' : 'failure'"
        v-show="showresult"
      >
        <i :class="result ? 'el-icon-check' : 'el-icon-close'"></i>
      </div>

      <div class="logic-item-add-btn" @click="addItem">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  name: "logicif",
  components: {},
  data() {
    return {
      arr: [],
      envobj: {},
      ruleTitle: '判断规则1',
      leftOpt: [
        {
          value: 'hosPatRegNo',
          label: '登记号'
        },
        {
          value: 'encId',
          label: '就诊号'
        },
        {
          value: 'pacsExamDept',
          label: '检查科室'
        }
      ],
      midOpt: [
        {
          value: 'equal',
          label: '等于'
        },
        {
          value: 'notequal',
          label: '不等于'
        },
        {
          value: 'include',
          label: '包含'
        }
      ]
    };
  },
  computed: {
    showresult() {
      return this.arr.length;
    },
    result() {
      return this.showresult && this.arr.every(itm => itm.result);
    }
  },
  created() {
    let _this = this;
    bus.$emit('ENV', function() { _this.envobj = this.obj });
    bus.$on('logicif', cb => cb.call(this));
  },
  methods: {
    addItem() {
      this.arr.push({ left: '', mid: '', right: '', result: false });
    },
    checkRowResult(itm) {
      let r = false;
      switch(itm.mid) {
        case 'equal':
          r = this.envobj[itm.left] === itm.right;
          break;
        case 'notequal':
          r = this.envobj[itm.left] != itm.right;
          break;
        case 'include':
          let v = this.envobj[itm.left];
          if (itm.right) r = itm.right.split(',').filter(t => v.indexOf(t) > -1).length > 0;
          break;
        default:
          break;
      }
      itm.result = r;
      console.log('itm.result', r);
    },
    addToIfPool() {
      let _this = this;
      if (this.arr.length === 0) {
        this.$message({
          message: '请添加规则！判断规则不能为空！',
          type: 'warning'
        });
        return;
      }
      let poolItem = {
        title: this.ruleTitle,
        rule: this.arr
      };
      console.log('poolItem', poolItem);
      bus.$emit('ifpool', function () {
        let flag = this.addPool(poolItem);
        if (flag) _this.reset();
      });
    },
    reset() {
      this.ruleTitle = '判断规则';
      this.arr = [];
    }
  }
};
</script>

<style lang="scss">
.logic-move-to-area {
  width: 500px;
  height: 500px;
  background-color: rgba(240, 240, 240, 0.8);
  border: 1px solid black;

  .upper,.down {
    padding: 10px;
  }

  .logic-result {
    border-radius: 3px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
  }
  .logic-result.success {
    color: green;
    border: 1px solid green;
  }
  .logic-result.failure {
    color: red;
    border: 1px solid red;
  }

  .logic-item-add-btn {
    border: 1px dashed black;
    border-radius: 3px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    cursor: pointer;

    &:hover {
      background-color: #aaa;
    }
  }

  
  .fns {
    float: right;
    i {
      margin-left: 10px;
      color: #409EFF;
      border: 1px solid #409EFF;
      background-color: #b3d9ff;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
.logic-item {
  background-color: #eee;
  width: 400px;

  .logic-item-row {
    display: inline-block;
    width: 120px;
  }

  .logic-item-result {
    display: inline-block;
    width: 30px;

    i {
      margin-left: 10px;
    }
    .success {
      color: green;
      border: 1px solid green;
      border-radius: 2px;
      background-color: rgba(118, 255, 100, 0.5);
    }
    .failure {
      color: red;
      border: 1px solid red;
      border-radius: 2px;
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
}
</style>