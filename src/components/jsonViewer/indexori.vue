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
const changeValueByRule = () => {

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
    arr = [ 
      h('span', { class: 'jw-key' }, key ),
      h('span', {}, ' : '),
      h('span', { class: 'number' === typeof value ? 'jw-value jw-type-num' : 'jw-value' }, 'string' === typeof value ? `"${value}"` : value),
      h('span', { style: { marginLeft: '1px' } }, ',')
    ];
  }
  v[1] = { class: className, style: { marginLeft: marginLeftPx } }, v[2] = arr;
  return v;
}

export default {
  name: 'json-viewer',
  props: {
    showbox: false,
    value: null
  },
  data() {
    return {
      refreshCount: 0
    }
  },
  render(h) {
    let level = 0;
    _this = this;
    if (!this.value) return h('div', { class: 'json-viewer', style: { padding: '5px' } }, '');
    return h('div', { class: 'json-viewer', style: { padding: '5px' }, attrs: { refreshCount: this.refreshCount } }, [
      h(...recursionParam(h, this.value, '', level, null, 'root'))
    ])
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>