/* 
  实例有环境，可以导出环境
  有各种请求，可以导出数据，如果有预设处理规则可以根据条件处理数据
  请求之间会有前后依赖，01和02接口是祖传接口作为请求依赖网的根基
*/

function HandleDataViewable(patientInfo) {
  if (!this.checkParam(patientInfo)) return console.error('Param patientInfo is not object!');

  this.patientInfo = this.setPatientInfo(patientInfo);
  this.category = this.getCategory();
}

HandleDataViewable.prototype = {
  constructor: HandleDataViewable,
  checkParam: function(patientInfo) {
    var flag = false;
    if ('[object Object]' === Object.prototype.toString.call(patientInfo)) flag = true;
    return flag;
  },
  setPatientInfo: function(patientInfo) {
    var defaultPatientInfo = {
      hosRegNo: '',
      patRegNo: '',
      businessFieldCode: '00001'
    };
    for (var k in patientInfo) {
      defaultPatientInfo[k] = patientInfo[k];
    }
    return defaultPatientInfo;
  },
  getMes0001: function() {},
  getMes0002: function() {},
  checkRule: function() {
    var result = true;
    return result;
  },
  getCategory: function() {
    var category = {
      med: {
        posterConfig: {}
      }
    };
    category.med.poster = new Poster(category.med.posterConfig);
    category.med.post = category.med.poster.xmlreq;

    return category;
  }
}

var a = {
  med: {
    isPost: false,
    value: null,
    postConfig: {},
    post: function() {},
    childrens: []
  }
}

function DataViewItem() {}
DataViewItem.prototype = {
  constructor: DataViewItem
}

function Poster(config) {
  this.config = this.getDefaultConfig(config);
}
Poster.prototype = {
  constructor: Poster,
  getDefaultConfig: function(config) {
    var defConfig = {
      url: '',
      method: 'get',
      async: false,
      handleRes: null
    };
    for (var k in config) {
      defConfig[k] = config[k];
    }
    return defConfig;
  },
  xmlreq: function() {
    var config = this.config;
    var url = config.url, method = config.method, async = config.async;
    var handleRes = config.handleRes;
    var res;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (handleRes) res = handleRes(xhr.responseText);
        else res = JSON.parse(JSON.stringify(xhr.responseText));
      }
    }
    xhr.send();
    return res;
  }
}