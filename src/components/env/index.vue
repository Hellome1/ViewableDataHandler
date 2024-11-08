<template>
  <div class="env">
    <div class="rect" :style="drawerVisible ? { right: size } : {}">
      <div class="env-item" v-for="(itm, key) in obj" :key="key">
        <span style="font-weight: bold">{{ENV_dict[key]}}：</span><span>{{itm}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus.js';
import { inject } from '@/inject.js';
export default {
  name: "env",
  data() {
    return {}
  },
  computed: {
    ...inject('dict', 'ENV', 'drawer')
  },
  mounted() {
    bus.$on('ENV', cb => cb.call(this));
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.rect {
  font-size: 14px;
  padding: 5px;
  position: fixed;
  z-index: 2999;
  right: 25px;
  top: 25px;
  border: 1px solid black;
  width: 180px;
  height: 250px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.3s;
}
</style>