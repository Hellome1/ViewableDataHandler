<template>
  <div class="timeline">
    <ul>
      <li class="tl-itm" v-for="(t, i) in arr" :key="i">
        <div class="tl-itm-desc" :title="t">{{t}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import request from '@/api/request.js';
export default {
  name: 'timeline',
  data() {
    return {
      arr: []
    }
  },
  created() {
    this.getVisits();
  },
  methods: {
    getVisits() {
      request({
        url: 'http://127.0.0.1:3000/MES0002',
        method: 'get'
      }).then(res => {
        let { data = [] } = res;
        this.arr = data.map(itm => {
          let diagnoseInfo = itm.diagnoseInfo || [];
          return diagnoseInfo.length ? 
            diagnoseInfo.map(d => (d.diagnoseName || d.diagnoseRemarks)).join(';') :
            '诊断未录入'
        })
      }).catch(err => {})
    }
  }
}
</script>

<style lang="scss">
.timeline {
  margin: 5px 0;
  ul {
    background-color: #eee;
    font-size: 0;
    user-select: none;
    overflow: auto;
    white-space: nowrap;

    .tl-itm {
      width: 120px;
      height: 30px;
      padding: 0 5px;
      border-radius: 3px;
      background-color: #ffb13b;
      text-align: center;
      display: inline-block;
      font-size: 14px;
      &:not(:first-child) {
        margin-left: 15px;
      }
      &:hover {
        background-color: #e79417;
      }

      .tl-itm-desc {
        line-height: 30px;
        color: rgb(53, 53, 53);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>