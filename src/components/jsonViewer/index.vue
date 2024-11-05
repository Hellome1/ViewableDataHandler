<script>
const objCopySort = (obj, key, value) => {
  let tmp = Object.assign({}, obj);
  for (let k in obj) {
    delete obj[k];
  }
  for (let k in tmp) {
    obj[k] = tmp[k];
    if (k === key) {
      obj[key + 'copy'] = value;
    }
  }
}

let _this;
const rule = {};
const changeValueByRule = (rule, value) => {
  r(value, null, 'root');
  console.log('handle value:', value);
  return value;
  
  function r(v, u, rk) {
    let rs = diff(rk);
    if (rs) handle(rs, u);
    if ('[object Array]' === Object.prototype.toString.call(v)) {
      for (let i = 0; i < v.length; i++) {
        let t = v[i];
        r(t, v, rk + '.' + i);
      }
    } else if ('[object Object]' === Object.prototype.toString.call(v)) {
      for (let k in v) {
        r(v[k], v, rk + '.' + k);
      }
    } else {

    }
  }
  function diff(rk) {
    let match = '';
    let rks = rk.split('.');
    for (let k in rule) {
      let ks = k.split('.');
      if (rks.length != ks.length) continue;
      let flag = ks.every((t, i) => {
        let numR = parseInt(t);
        let isNumR = !isNaN(numR);
        let vRk = rks[i];
        let numRk = parseInt(vRk);
        let isNumRk = !isNaN(numRk);
        let allNum = isNumR === true && isNumRk === true;
        let endWithNum = false;
        if (i === ks.length - 1 && isNumR) endWithNum = true;
        if (endWithNum) return t === vRk;
        return allNum || t === vRk;
      });
      if (flag) {
        match = k;
        break;
      }
    }
    return match;
  }
  function handle(k, address) {
    let ruleValues = rule[k];
    let ks = k.split('.');
    let key = ks[ks.length - 1];
    let addressArr = '[object Array]' === Object.prototype.toString.call(address);
    key = !isNaN(parseInt(key)) ? parseInt(key) : key;
    ruleValues.forEach(ruleValue => {
      let value = address[key];
      let _value = value ? JSON.parse(JSON.stringify(value)) : value;
      if (!_value) {
        console.warn('没有这个值', address, key);
        return;
      }
      switch (ruleValue) {
        case 'copy':
          if (addressArr) {
            address.splice(key, 0, _value);
          } else {
            objCopySort(address, key, _value);
          }
          break;
        case 'delete':
          if (addressArr) {
            address.splice(key, 1);
          } else {
            delete address[key];
          }
          break;
        default:
          break;
      }
    })
  }
}
const setRule = (key, value) => {
  let rule = JSON.parse(JSON.stringify(_this.rule));
  if (isDeleCopy()) {
    
  } else if (key in rule) {
    if (!rule[key].includes(value)) rule[key].push(value);
  } else {
    rule[key] = [ value ];
  }
  _this.rule = rule;
  console.log('rule', rule);

  function isDeleCopy() {
    let lastFourKey = key.slice(0, key.length - 4);
    if (value != 'delete') return false;
    let situation1 = /.*copy$/.test(key) && whenRuleNullDel(lastFourKey);
    if (situation1) return situation1;

    let situation2Entry = /.*\.\d+$/.test(key);
    if (situation2Entry) {
      if (whenRuleNullDel(key)) return true;
      let ks = key.split('.');
      let inferEndWithNumKey = ks.map((t, i) => (i === ks.length - 1 ? parseInt(t) - 1 : t )).join('.');
      let situation2 = whenRuleNullDel(inferEndWithNumKey);
      return situation2;
    }
    return false;
  }
  function whenRuleNullDel(key) {
    if (!(key in rule)) return false;
    let ruleValue = rule[key];
    ruleValue = ruleValue.filter(itm => (itm != 'copy'));
    if (ruleValue.length === 0) delete rule[key];
    else rule[key] = ruleValue;
    return true;
  }
}
const recursionParam = (h, value, key = '', level, upper, rk = 'root') => {
  level++;

  let v = ['div', { class: '' }, []];
  let className = '', arr = [];
  let marginLeftPx = 5 * level + 'px';
  if ('[object Array]' === Object.prototype.toString.call(value)) {
    className = 'jw-array';
    arr = [
      h('span', { class: 'jw-key', style: level > 1 ? 'position: relative; left: -14px; user-select: none;' : '' }, [
        h(
          'i', 
          { 
            class: level > 1 ? 'jw-fold el-icon-caret-right' : '', 
            style: 'cursor: pointer;',
            on: {
              click: () => {
                value._jwstate_fold = !value._jwstate_fold;
                console.log('fold', value._jwstate_fold);
                _this.refreshCount++;
              }
            }
          }
        ),
        h('span', { class: 'jw-array-key' }, '' != key ? key + ' : ' : key) , 
        h('span', { style: { color: 'rgb(0, 20, 255)', fontWeight: 'bold' } }, '['),
      ]),
      h(
        'span',
        { class: 'jw-array-value', style: value._jwstate_fold ? 'font-weight: bold; position: relative; left: -7px; top: -3px;' : '' },
        value._jwstate_fold ? '...' :
        value.map((itm, i) => h(...recursionParam(h, itm, i, level, value, rk + '.' + i)))
      ),
      h('span', { style: { color: 'rgb(0, 20, 255)', fontWeight: 'bold' } }, level === 1 ? ']' : '],')
    ];
  } else if ('[object Object]' === Object.prototype.toString.call(value)) {
    className = 'jw-object';
    let arrchi = [];
    for (let k in value) {
      arrchi.push(
        h(...recursionParam(h, value[k], k, level, value, rk + '.' + k))
      );
    }
    console.log('value._jwstate_fold', value._jwstate_fold);
    arr = [
      h('span', { class: 'jw-key', style: level > 1 ? 'position: relative; left: -14px; user-select: none;' : '' }, [
        h(
          'i', 
          { 
            class: level > 1 ? 'jw-fold el-icon-caret-right' : '', 
            style: 'cursor: pointer;',
            on: {
              click: () => {
                value._jwstate_fold = !value._jwstate_fold;
                console.log('fold', value._jwstate_fold);
                _this.refreshCount++;
              }
            }
          }
        ),
        h('span', { class: 'jw-object-key', style: 'number' === typeof key ? { fontWeight: 'bold' } : {} }, '' !== key ? key + ' : ' : key),
        h('span', { style: {  color: 'rgb(255, 0, 255)', fontWeight: 'bold' } }, '{'),
      ]),
      h(
        'span', 
        { class: 'jw-object-value', style: value._jwstate_fold ? 'font-weight: bold; position: relative; left: -7px; top: -3px;' : '' }, 
        value._jwstate_fold ? '...' : arrchi
      ),
      h('span', { style: { color: 'rgb(255, 0, 255)', fontWeight: 'bold' }}, [h('span', {}, '}'), h('span', { style: { marginLeft: '1px' } }, level === 1 ? '' : ',')])
    ];
  } else {
    className = 'jw-keyvalue';
    if (key === '_jwstate_fold') return v;
    arr = [ 
      h('span', { class: 'jw-key' }, key ),
      h('span', {}, ' : '),
      h('span', { class: 'number' === typeof value ? 'jw-value jw-type-num' : 'jw-value' }, 'string' === typeof value ? `"${value}"` : value),
      h('span', { style: { marginLeft: '1px' } }, ',')
    ];
  }
  _this.showbox && level > 1 && arr.push(
    h('span', { class: 'jw-tool-box' }, [
      h(
        'i', 
        { 
          class: 'jw-handle el-icon-document-copy', 
          style: { cursor: 'pointer' }, 
          on: { 
            click: () => {
              setRule(rk, 'copy');
            }
          } 
        }
      ),
      h(
        'i', 
        { 
          class: 'jw-handle el-icon-delete', 
          style: { cursor: 'pointer' }, 
          on: { 
            click: () => {
              console.log('delete upper', upper, 'key', key);
              setRule(rk, 'delete');
            }
          } 
        }
      )
    ])
  )
  v[1] = { class: className, style: { marginLeft: marginLeftPx } }, v[2] = arr;
  return v;
}

export default {
  name: 'json-viewer',
  props: {
    showbox: false,
    valueraw: null
  },
  data() {
    return {
      rule: {},
      refreshCount: 0
    }
  },
  computed: {
    value() {
      return changeValueByRule(this.rule, this.cp(this.valueraw));
    }
  },
  render(h) {
    let level = 0;
    _this = this;
    if (!this.value) return h('div', { class: 'json-viewer', style: { padding: '5px' } }, '');
    return h('div', { class: 'json-viewer', style: { padding: '5px' }, attrs: { refreshCount: this.refreshCount } }, [
      h(...recursionParam(h, this.value, '', level, null, 'root'))
    ]);
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>