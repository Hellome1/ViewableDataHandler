<template>
  <div class="drawer-use-post">
    <div class="poster-upon-area">
      <div class="layoutFlex">
        <h5 style="line-height: 25px; margin-left: 5px">设置判断条件:</h5>
        <div class="list-row-small">
          <template v-if="showRuleList">
            <span
              class="poster-rule-item clickable"
              :class="r.state ? 'check' : ''"
              v-for="(r, i) in ruleList"
              :key="i"
              @click="setRule(r)"
            >
              {{ r.name }}
              <i class="el-icon-check corner-icon" v-if="r.state"></i>
            </span>
          </template>
          <template v-else>
            <span class="poster-rule-item" v-for="r in ruleNames" :key="r">{{
              r
            }}</span>
          </template>
          <span
            :class="showRuleList ? 'el-icon-check' : 'el-icon-plus'"
            @click="handleSure"
          ></span>
        </div>
      </div>
    </div>
    <Poster />
  </div>
</template>

<script>
import request from '@/api/request.js';
import Poster from './poster.vue';
export default {
  name: "drawerUsePost",
  components: {
    Poster
  },
  data() {
    return {
      ruleNames: [],
      ruleList: [
        { name: "判断规则1", state: false },
        { name: "判断规则2", state: false },
      ],
      showRuleList: false,
    };
  },
  created() {},
  computed: {
    code() {
      return this.$store.state.poster.code;
    }
  },
  watch: {
    code(value) {
      if (value) this.getRule();
    },
  },
  methods: {
    getRule() {
      const { role } = PRESET;
      request({
        url:
          "http://127.0.0.1:3000/ruleList?role=" + role + "&code=" + this.code,
        method: "get",
      })
        .then((res) => {
          if (res.data) {
            this.ruleNames = res.data;
            this.setRuleListCheck();
          }
        })
        .catch((err) => {});
    },
    setRuleListCheck() {
      let ruleNames = this.ruleNames,
        ruleList = this.cp(this.ruleList);
      ruleList.forEach((itm) => {
        if (ruleNames.includes(itm.name)) itm.state = true;
      });
      this.ruleList = ruleList;
    },
    setRule(rObj) {
      let r = rObj.name;
      rObj.state = !rObj.state;
      let ruleNames = this.cp(this.ruleNames),
        ruleList = this.cp(this.ruleList);
      if (ruleNames.includes(r))
        ruleNames = ruleNames.filter((itm) => itm != r);
      else
        ruleNames = ruleList.filter((itm) => itm.state).map((itm) => itm.name);
      this.ruleNames = ruleNames;
      this.ruleList = ruleList;
    },
    handleSure() {
      this.showRuleList = !this.showRuleList;
      if (!this.showRuleList) {
        this.postRule();
      }
    },
    postRule() {
      const { role } = PRESET;
      const ruleNames = this.ruleNames;
      let data = {
        value: ruleNames.map((itm) => ({
          rulename: itm,
          role,
          code: this.code,
        })),
      };
      request({
        url: "http://127.0.0.1:3000/ruleList/save",
        method: "post",
        data,
      })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss">
.poster-upon-area {
  height: 25px;
  background-color: #eee;
  text-align: left;

  .list-row-small {
    padding: 0 5px;
    line-height: 25px;

    .poster-rule-item {
      margin-left: 5px;
      padding: 1px 3px;
      color: rgb(255, 153, 0);
      border: 1px solid rgb(255, 153, 0);
      border-radius: 3px;
      font-size: 12px;
      user-select: none;
      position: relative;

      &.clickable {
        cursor: pointer;
      }
      &.check {
        color: green;
        border: 1px solid green;
        padding: 1px 8px 1px 3px;
      }
      .corner-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: green;
        color: white;
        font-size: 8px;
      }
    }
    .el-icon-plus {
      margin-left: 5px;
      color: #aaa;
      border: 1px solid #aaa;
      border-radius: 3px;
      cursor: pointer;
    }
    .el-icon-check {
      margin-left: 5px;
      color: green;
      border: 1px solid green;
      border-radius: 3px;
      cursor: pointer;
    }
    .el-icon-plus,.el-icon-check {
      &:hover {
        background-color: #ddd;
      }
    }
  }
}
</style>