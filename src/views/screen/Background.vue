<template>
  <div class="screen-wrapper h-100vh min-h-2xl overflow-hidden relative">
    <video class="absolute inset-0 w-full h-full object-fill" autoplay loop muted>
      <source
        src="https://pic.snsboat.com/saas/normal/customer/61/83/D7iOD5gRMuXjvpV2lA/2024/11/12/0ef5549d3720fdd630ba490eaf023fb5.mp4"
        type="video/mp4"
      />
    </video>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';

defineOptions({
  name: 'ScreenBackground',
});
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
