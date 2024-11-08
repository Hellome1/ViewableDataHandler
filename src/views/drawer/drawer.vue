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
    <div style="padding: 0 20px; overflow: hidden;" ref="drawerContentContainer">
      <el-page-header @back="goBack" content="请求列表">
      </el-page-header>
      <div class="drawer-switch">
        <DrawerSwitchItem :curIndex="currentIndex" :index="0" :width="drawerContentWidth">
          <List :next="next" />
        </DrawerSwitchItem>
        <DrawerSwitchItem :curIndex="currentIndex" :index="1" :width="drawerContentWidth">
          <DrawerUsePost />
        </DrawerSwitchItem>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { inject } from '@/inject.js';
import List from '@/components/list/index.vue';
import DrawerSwitchItem from './switchItem.vue';
import DrawerUsePost from '@/components/poster/drawerUsePost.vue';
export default {
  name: "drawer",
  components: {
    List,
    DrawerSwitchItem,
    DrawerUsePost
  },
  data() {
    return {
      currentIndex: 0,
      drawerContentWidth: 999
    };
  },
  mounted() {
    
  },
  watch: {
    drawerVisible(value) {
      if (value) this.currentIndex = 0;
    }
  },
  computed: {
    ...inject('drawer'),
    drawer() {
      return this.$store.state.drawer;
    }
  },
  methods: {
    goBack() {
      this.drawerContentWidth = this.getContentWidth();
      this.currentIndex > 0 && this.currentIndex--;
    },
    next() {
      this.drawerContentWidth = this.getContentWidth();
      this.currentIndex < 1 && this.currentIndex++;
    },
    getContentWidth() {
      let dom = this.$refs.drawerContentContainer;
      return dom && dom.offsetWidth || 0;
    }
  }
};
</script>

<style lang="scss">
.drawer-switch {
  position: relative;
  height: calc(100vh - 110px);
}
</style>