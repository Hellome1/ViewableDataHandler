<template>
<!-- 完整的规则，包含条件和数据请求、处理 -->
  <div class="list">
    <ul>
      <li class="list-item" v-for="(t, i) in list" :key="i" @click="setListShowIndex(2)">
        <span class="list-item-index">{{i + 1}}.</span>
        <span class="list-item-desc">{{t}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      list: [
        'MES0001',
        'MES0002'
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
.list {
  width: 300px;
  height: 500px;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: rgba(200, 220, 220, 0.8);

  ul {
    .list-item {
      height: 30px;
      line-height: 26px;
      padding: 3px 5px;
      background-color: #eee;
      border-bottom: 1px solid white;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;

      .list-item-index {
        margin-right: 5px;
      }
      .list-item-desc {}
    }
  }
}
</style>