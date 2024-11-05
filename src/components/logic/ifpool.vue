<template>
  <div class="if-pool">
    <div class="tools">
      <i
        class="el-icon-delete"
        style="color: red; cursor: pointer"
        @click="clear"
      ></i>
    </div>

    <div>
      <span
        class="if-pool-item"
        v-for="(p, i) in pools"
        :key="i"
        @click="seeRule(p)"
      >
        {{ p.title }}
      </span>
    </div>
  </div>
</template>

<script>
import bus from "@/bus.js";
import request from "@/api/request.js";
export default {
  name: "ifpool",
  data() {
    return {
      pools: [],
    };
  },
  watch: {},
  created() {
    bus.$on("ifpool", (cb) => cb.call(this));
    this.getPool();
  },
  methods: {
    getPool() {
      request({
        url: "http://127.0.0.1:3000/ifpool/get",
        method: "get",
      })
        .then((res) => {
          let { data } = res;
          if (data) {
            this.pools = data;
          }
        })
        .catch((err) => {});
    },
    clear() {
      this.pools = [];
      request({
        url: "http://127.0.0.1:3000/ifpool/delete",
        method: "get",
      })
        .then((res) => {
          let { code, msg } = res;
          if (code === 200) {
            console.log("ifpool/delete msg:", msg);
            this.pools = [];
          }
        })
        .catch((err) => {});
    },
    save() {
      let pools = this.pools;
      if (pools.length) {
        let postParam = {
          url: "http://127.0.0.1:3000/ifpool/save",
          method: "post",
        };
        postParam.data = { value: pools };
        request(postParam).then((res) => {
          console.log(res);
        });
      }
    },
    addPool(p) {
      p = JSON.parse(JSON.stringify(p));
      let flag = true;
      let { title, rule } = p;
      let jsonstrRule = JSON.stringify(rule);
      this.pools.forEach((pool) => {
        let jsonstrPoolRule = JSON.stringify(pool.rule);
        if (pool.title === title || jsonstrPoolRule === jsonstrRule) {
          flag = false;
          this.$message({
            message: "规则不能重复添加！",
            type: "warning",
          });
        }
      });
      if (flag) {
        this.pools.push(p);
        this.save();
      }
      return flag;
    },
    seeRule(p) {
      let { title, rule } = p;
      bus.$emit("logicif", function () {
        this.ruleTitle = title;
        this.arr = JSON.parse(JSON.stringify(rule));
      });
    },
  },
};
</script>

<style lang="scss">
.if-pool {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  padding: 5px;
  margin-left: 10px;
  overflow: auto;

  .tools {
    text-align: end;
  }

  .if-pool-item {
    font-size: 12px;
    display: inline-block;
    margin: 0 3px 3px;
    border: 1px solid rgb(255, 153, 0);
    color: rgb(255, 153, 0);
    background-color: white;
    padding: 3px 8px;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>