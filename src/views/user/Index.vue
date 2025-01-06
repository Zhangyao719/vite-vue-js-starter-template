<template>
  <div class="w-100vw h-100vh">
    <router-view />
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router';

defineOptions({
  name: 'UserIndex',
});

// onBeforeRouteEnter(() => {
//   console.log(123);
// });

onBeforeRouteLeave(() => {
  // 其他页面（非移动端），恢复默认字体大小
  document.documentElement.style.fontSize = 16 + 'px';
});
</script>
