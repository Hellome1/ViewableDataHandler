<template>
  <div class="post-list">
    <ul>
      <li class="post-list-item" v-for="(t, i) in arr" :key="i">
        {{t}}

        <span class="btns-fn" @click="deleItem(i)">
          <i class="el-icon-delete"></i>
        </span>
      </li>
    </ul>

    <div class="add-btn post-list-add-btn" @click="addItem">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postList',
  data() {
    return {
      arr: [1]
    }
  },
  methods: {
    addItem() {
      this.arr.push(this.arr.length + 1);
    },
    deleItem(index) {
      this.arr.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
.post-list {
  border: 1px solid black;
  width: 300px;
  height: 500px;
  padding: 10px;
  background-color: #eee;

  ul {
    height: 430px;
    overflow: auto;
    .post-list-item {
      background-color: white;
      height: 25px;
      line-height: 25px;
      padding-left: 5px;
      
      &:not(:first-child) {
        margin-top: 5px;
      }
      .btns-fn {
        float: right;
        padding: 0 5px;
        cursor: pointer;
        color: red;
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
}
</style>