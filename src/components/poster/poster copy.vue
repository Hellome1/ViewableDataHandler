<template>
  <div class="poster">
    <div>
      <div class="layoutFlex">
        <div class="layoutFlex-left pd5">
          <el-row>
            <el-col :span="24">
              <label>请求地址：</label>
            </el-col>
            <el-col :span="24">
              <el-input v-model="post.url" placeholder="请输入地址"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label>请求方式：</label>
            </el-col>
            <el-col :span="24">
              <el-select v-model="post.method">
                <el-option label="GET" value="get"></el-option>
                <el-option label="POST" value="post"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label>Content-Type：</label>
            </el-col>
            <el-col :span="24">
              <el-input v-model="postHeader['Content-Type']"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label>请求参数</label>
            </el-col>
            <el-col :span="24">
              <el-row v-for="(ppobj, ind) in postParam" :key="ind">
                <el-col :span="5">
                  <el-input v-model="ppobj.key"></el-input>
                </el-col>
                <el-col :span="1" style="text-align: center; line-height: 35px;">:</el-col>
                <el-col :span="18">
                  <el-input v-model="ppobj.value"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label>测试数据</label>
            </el-col>
            <el-col :span="24">
              <el-input type="textarea" v-model="testDataStr" resize="none"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="layoutFlex-right pd5">
          <div style="height: 20px;">
            <h4>
              数据预览
              <span style="font-size: 12px; margin-left: 10px;">
                <i class="el-icon-warning"></i>
                <span>设置测试数据后，数据预览只会展示测试数据</span>
              </span>
            </h4>
          </div>
          <div style="height: calc(100% - 20px)">
            <div class="data-display border dash">
              <div v-if="!data"></div>
              <JsonViewerOri :value="data"/>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 8px;">
        <el-row>
          <el-col :span="8" style="height: 1px;"></el-col>
          <el-col :span="8" style="text-align: center;">
            <el-button type="primary" size="mini" @click="send">发送</el-button>
            <el-button type="primary" size="mini" :disabled="!data" @click="handleData">处理数据</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini" :disabled="!data">确认使用</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/api/request';
import JsonViewerOri from '@/components/jsonViewer/indexori.vue';
const getQSParam = (arr) => {
  return arr.map((itm, i) => (`${itm.key}=${itm.value}${i != arr.length - 1 ? '&' : ''}`)).join('');
}

export default {
  name: "poster",
  components: {
    JsonViewerOri
  },
  props: {
    rule: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      post: {
        url: "http://127.0.0.1:3000/MES0005",
        method: "post",
      },
      postHeader: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      postParam: [
        { 
          key: 'params', 
          value: '{"data":{"businessFieldCode":"00001","hdcPatientId":"00001_608","hdcEncId":"","hosPatRegNo":"07208561","hosEncId":""}}'
        }
      ],
      data: null,
      testDataStr: ''
    };
  },
  computed: {
    testData() {
      let t = null;
      let testDataStr = this.testDataStr;
      try {
        t = testDataStr ? JSON.parse(testDataStr) : t;
      } catch (e) {
        alert('JSON格式不正确！');
        throw e;
      }
      return t;
    }
  },
  methods: {
    send() {
      let axiosConfig = this.cp(this.post);
      axiosConfig.headers = this.cp(this.postHeader);
      let qsp = getQSParam(this.postParam);
      axiosConfig.data = qsp;
      console.log('axiosConfig', axiosConfig)
      let testData = this.testData;
      console.log('testData', testData);
      if (!testData) {
        request(axiosConfig).then(res => {
          let { data = [] } = res;
          this.data = res;
          // this.setRow(data);
        }).catch(e => {
          console.log('catch error');
          console.error(e);
        });
      } else {
        this.data = testData;
        // this.setRow(testData);
      }
    },
    handleData() {
      
    }
  }
};
</script>

<style lang="scss">
.poster {
  text-align: left;

  .data-display {
    height: 100%;
  }
}
</style>