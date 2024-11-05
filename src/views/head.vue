<template>
  <div class="head">
    <el-row>
      <el-col :span="6">
        <div class="patno-show-post">
          <el-input v-model="hosPatRegNo" placeholder="请输入登记号" size="small" style="width: calc(100% - 180px);"></el-input>
          <el-button type="primary" size="mini" @click="send" style="margin-left: 10px;">发送</el-button>
          <div class="pat-name-show-box">
            {{ patName }}
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <Timeline />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Timeline from '@/views/timeline.vue'
import request from '@/api/request.js'
export default {
  name: 'theader',
  components: {
    Timeline
  },
  data() {
    return {
      hosPatRegNo: '0008968721',
      patName: ''
    }
  },
  created() {
    this.send();
  },
  methods: {
    send() {
      if (this.hosPatRegNo) {
        let postParam = {}
        request({
          url: `http://127.0.0.1:3000/MES0001?hosPatRegNo=${this.hosPatRegNo}`,
          method: 'post'
        }).then(res => {
          console.log('MES0001 res:', res);
          let { data } = res;
          if (data.length) {
            let { patientName } = data[0];
            this.patName = patientName;
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.head {
  .patno-show-post {
    line-height: 36px;

    .pat-name-show-box {
      display: inline-block;
      width: 90px;
      height: 30px;
      line-height: 26px;
      text-align: center;
      font-weight: bold;
      vertical-align: middle;
      margin-left: 10px;
      padding: 3px 8px;
      background-color: #eee;
    }
  }
}
</style>