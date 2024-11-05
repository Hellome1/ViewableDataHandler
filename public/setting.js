var global_state = {
  logic: {

  },
  poster: {
    dialogVisible: false,
    code: '',
    title: '请求器'
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
          {
            "left": "hosPatRegNo",
            "mid": "equal",
            "right": "0000813452"
          }
        ],
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