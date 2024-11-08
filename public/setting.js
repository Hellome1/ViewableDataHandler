var global_state = {
  dict: {
    ENV_dict: {
      hosPatRegNo: '登记号',
      encId: '就诊号',
      pacsExamDept: '检查科室'
    }
  },
  ENV: {
    obj: {
      hosPatRegNo: '0000813452',
      encId: '0003325',
      pacsExamDept: '超声科'
    }
  },
  logic: {},
  poster: {
    dialogVisible: false,
    code: '',
    title: '请求器'
  },
  drawer: {
    drawerVisible: false,
    size: '25%',
    code: '',
    title: '请求列表'
  },
  list: {
    list: []
  }
}

var PRESET = {
  role: 'admin'
}

var conditionDict = {
  ruleOne: {
    "title": "判断规则1",
    "rule": [
      {
        "left": "patIdNo",
        "mid": "equal",
        "right": "0000813452",
        "result": "true"
      }
    ]
  },
  ruleTwo: {
    "title": "判断规则2",
    "rule": [
      {
        "left": "encId",
        "mid": "equal",
        "right": "0003325",
        "result": "true"
      }
    ]
  }
}

var dict1 = {
  MedicalOrder: {
    name: '用药医嘱',
    action: 'MES0005',
    payload: { hdcEncId: 'enc.hdcEncId' },
    handler: [
      {
        name: '用药医嘱条件与处理方式一',
        code: 'MedicalOrderHandlerOne',
        condition: [
          'ruleOne'
        ],
        tpost: {
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
          ]
        },
        excute: {
          "root.data.0.ordSubCatDesc": [
            "copy"
          ],
          "root.data.0.hosOrdId": [
            "delete"
          ]
        }
      }
    ],
    children: {
      MedicalOrderLoop: {
        name: '用药闭环',
        action: 'MES0018',
        payload: { ensLogId: 'row.ensLogId', systemCode: 'MED' }
      }
    }
  },
  PACS: {
    name: '检查',
    action: 'MES0012',
    payload: { hdcEncId: 'enc.hdcEncId' },
    handler: [],
    children: {
      MedicalOrderLoop: {
        name: '检查闭环',
        action: 'MES0018',
        payload: { ensLogId: 'row.ensLogId', systemCode: 'PACS' }
      }
    }
  },
  LIS: {
    name: '检验',
    action: 'MES0024',
    payload: { hdcEncId: 'enc.hdcEncId' },
    handler: [],
    children: {
      MedicalOrderLoop: {
        name: '检验闭环',
        action: 'MES0018',
        payload: { ensLogId: 'row.ensLogId', systemCode: 'LIS' }
      }
    }
  }
}