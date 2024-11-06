<template>
  <el-drawer
    :visible.sync="drawerVisible"
    direction="rtl"
    :modal="false"
    :size="size"
    :before-close="() => drawer.drawerVisible = false"
  >
    <template v-slot:title>
      <h3>{{ title }}</h3>
    </template>
    <div style="padding: 0 20px;">
      <List />
    </div>
  </el-drawer>
</template>

<script>
import { inject } from '@/inject.js';
import List from '@/components/list/index.vue';
export default {
  name: "drawer",
  components: {
    List
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...inject('drawer'),
    drawer() {
      return this.$store.state.drawer;
    }
  }
};
</script>

<style>
</style>