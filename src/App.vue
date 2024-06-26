
<script setup>
import { provide, shallowRef } from 'vue';
import layouts from './layouts/index';
import router from './router'
const layout = shallowRef('main');

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'main';
})

console.log((layout));

provide('app:layout', layout)

</script>

<template>
  <component :is="layout">
    <router-view />

  </component>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
