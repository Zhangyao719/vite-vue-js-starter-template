<template>
  <div class="screen-wrapper h-100vh min-h-2xl overflow-hidden relative pt-7%">
    <!-- 视频背景 -->
    <video class="absolute inset-0 w-full h-full object-fill" autoplay loop muted>
      <source
        src="https://pic.snsboat.com/saas/normal/customer/61/83/D7iOD5gRMuXjvpV2lA/2024/11/12/0ef5549d3720fdd630ba490eaf023fb5.mp4"
        type="video/mp4"
      />
    </video>

    <!-- 音频 -->
    <div :class="classMusic" @click="toggleMusic">
      <div class="music-btn w-48px h-48px" />
      <audio ref="musicRef" loop preload="auto">
        <source
          src="https://pic.snsboat.com/saas/normal/customer/undefined/undefined/A76QZ8LWcsYNLHkvZ56QZ8lw/2023/2/17/9ed42a6bcfc3f2a18b618b580ce94092.mp3"
          type="audio/mp3"
        />
      </audio>
    </div>

    <!-- 工具栏 -->
    <span class="action-btn rounded-50% w-46px h-46px z-1" @click="show = !show">
      <icon-font
        class="absolute top-50% left-50% translate-x--50% translate-y--50%"
        name="setting-1"
        size="30px"
        style="color: #fff176"
      />
    </span>
    <t-drawer
      v-model:visible="show"
      class="setting-drawer"
      placement="bottom"
      :header="false"
      :footer="false"
      size="100px"
    >
      <t-button class="mr-4!" @click="router.push({ name: 'ScreenWelcome' })">首页</t-button>
      <t-button class="mr-4!" @click="router.push({ name: 'Lottery' })">大屏抽奖</t-button>
      <t-select v-model="prizeType" class="inline-block w-120px!" placeholder="-选择奖项-" @change="onPrizeChange">
        <t-option v-for="p in PrizeOptions" :key="p.value" :value="p.value" :label="p.label" />
      </t-select>
    </t-drawer>

    <!-- 子路由 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide, readonly } from 'vue';
import { useRouter } from 'vue-router';
import { IconFont } from 'tdesign-icons-vue-next';
import useMusic from '@/hooks/useMusic';
import { PrizeOptions, getPrizeInfo } from './constant';

defineOptions({
  name: 'ScreenBackground',
});

const router = useRouter();

const { musicRef, classMusic, toggleMusic } = useMusic();

// #region 工具栏
const show = ref(false);
const prizeType = ref();
const prizeInfo = ref({});
const onPrizeChange = (value) => {
  prizeInfo.value = getPrizeInfo(value);
};
// 将当前奖项信息传递给子组件
provide('prizeInfo', readonly(prizeInfo));
// #endregion
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

@keyframes rotateMusic {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

.lottery-music {
  position: absolute;
  top: 6.5%;
  left: 2.5%;
  z-index: 1;
  cursor: pointer;

  &.stoped {
    .music-btn {
      animation-play-state: paused;
    }
  }

  .music-btn {
    background: url('../../assets/imgs/music-btn.png') no-repeat center;
    background-size: contain;
    background-blend-mode: lighten;
    animation: rotateMusic 1.2s linear infinite;
  }
}

.action-btn {
  position: absolute;
  top: 15%;
  left: 2.5%;
  border: 2px solid #fff176;

  &:hover {
    cursor: pointer;
  }
}

:global(.setting-drawer .t-drawer__mask) {
  background-color: transparent;
}

:global(.setting-drawer .t-drawer__content-wrapper) {
  background-color: rgb(0 0 0 / 40%);
}

:global(body) {
  width: 100% !important;
}
</style>
