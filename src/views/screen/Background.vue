<template>
  <div class="screen-background h-100vh overflow-hidden relative pt-12vh">
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
      <audio ref="musicRef" preload="metadata" :loop="musicConfig.loop">
        <source :src="musicConfig.src" type="audio/mp3" />
      </audio>
    </div>

    <!-- 工具栏 -->
    <span
      class="action-btn absolute top-15% left-2.5% rounded-50% w-46px h-46px z-1 hover:cursor-pointer"
      @click="show = !show"
    >
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
      <t-button class="mr-4!" @click="backHome">首页</t-button>
      <!-- 选择活动 -->
      <t-select
        v-model="activityId"
        class="inline-block w-150px! mr-4!"
        placeholder="-选择活动-"
        @change="onActivityChange"
      >
        <t-option v-for="a in lotteryStore.activityOptions" :key="a.value" :value="a.value" :label="a.label" />
      </t-select>
      <!-- 选择抽奖等级 -->
      <t-select v-model="prizeLevel" valueType="object" class="inline-block w-150px! mr-4!" placeholder="-选择奖项-">
        <t-option v-for="p in lotteryStore.prizeLevelOptions" :key="p.value" :value="p.value" :label="p.label" />
      </t-select>
      <!-- 选择场内/场外 -->
      <t-radio-group v-model="prizeScene" variant="primary-filled" class="align-middle mr-4!">
        <t-radio-button :value="PrizeScene.Indoor">{{ PrizeScene[1] }}</t-radio-button>
        <t-radio-button :value="PrizeScene.Outdoor">{{ PrizeScene[2] }}</t-radio-button>
      </t-radio-group>
      <!-- 选择抽奖人数 -->
      <t-input-number
        v-model="prizeNum"
        class="align-middle w-160px! mr-4!"
        theme="column"
        align="center"
        :max="100"
        :min="1"
        label="中奖人数"
      />
      <t-button class="mr-4!" @click="startLottery"> 大屏抽奖 </t-button>
    </t-drawer>

    <!-- 活动二维码 -->
    <t-tooltip
      trigger="click"
      placement="right"
      :showArrow="false"
      overlayClassName="tooltip-overlay"
      :overlayInnerStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }"
    >
      <span class="action-btn absolute top-23% left-2.5% rounded-50% w-46px h-46px z-1 hover:cursor-pointer">
        <icon-font
          class="absolute top-50% left-50% translate-x--50% translate-y--50%"
          name="qrcode"
          size="30px"
          style="color: #fff176"
        />
      </span>
      <template #content>
        <div class="text-center">
          <p class="text-2xl text">1、扫描二维码</p>
          <img :src="qrCodeSrc" width="280" alt="二维码" />
          <br />
          <p class="text-2xl text">2、关注公众号</p>
          <img src="@/assets/imgs/guide_follow.png" width="280" alt="" />
          <br />
          <p class="text-2xl text">3、参与链接</p>
          <img src="@/assets/imgs/guide_link.png" width="280" alt="" />
        </div>
      </template>
    </t-tooltip>

    <!-- 子路由 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" ref="lotteryRef" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide, readonly, watch, onBeforeMount, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { IconFont } from 'tdesign-icons-vue-next';
import useMusic from '@/hooks/useMusic';
import { MusicConfig, PrizeScene } from './constant';
import { useLotteryStore } from '@/store/modules/lottery';
import useCache from '@/utils/storage';
import { WX_QRCODE_HREF } from '@/utils/constant';

defineOptions({
  name: 'ScreenBackground',
});

const router = useRouter();
const lotteryStore = useLotteryStore();
const { wsCache, CACHE_KEY } = useCache();

// #region 音频（背景音乐、抽奖音乐等）
const { musicRef, musicState, classMusic, musicConfig, selectMusic, toggleMusic } = useMusic();
watch(
  () => musicConfig.value.src,
  (newSrc, oldSrc) => {
    // 重新加载音频
    if (musicRef.value && newSrc && newSrc !== oldSrc) {
      musicRef.value.pause();
      musicRef.value.load();
      // 如果当前是播放状态，则继续播放
      if (musicState.value) musicRef.value.play();
    }
  },
);
// #endregion

// #region 工具栏
const show = ref(false);
const activityId = ref(); // 当前活动
const prizeLevel = ref(); // 抽奖等级
const prizeScene = ref(PrizeScene.Indoor); // 抽奖场景
const prizeNum = ref(); // 抽奖人数
const prizeInfo = reactive({
  activityId,
  prizeLevel,
  prizeScene,
  prizeNum,
});
// 将当前奖项信息注入给子组件
provide('prizeInfo', readonly(prizeInfo));

// 返回首页
const backHome = () => {
  selectMusic(MusicConfig.Bgm);
  router.push({ name: 'ScreenWelcome' });
};

// 开始大屏抽奖
const lotteryRef = useTemplateRef('lotteryRef');
const startLottery = () => {
  if (lotteryRef.value?.resetLottery) lotteryRef.value?.resetLottery();
  router.push({ name: 'Lottery' });
  show.value = false;
};
// #endregion

//#region 获取活动二维码
const qrCodeSrc = ref('');

// 默认选中第一个活动
watch(
  () => lotteryStore.activityOptions.length,
  (length) => {
    if (length) {
      activityId.value = lotteryStore.activityOptions[0]?.value;
      getQrCodeImg();
    }
  },
  { once: true },
);

// 切换活动，重新获取二维码
const onActivityChange = () => getQrCodeImg();
const getQrCodeImg = async () => {
  // 1. 活动页需手动存储当前活动的 id
  wsCache.set(CACHE_KEY.ACTIVITY_ID, activityId.value);
  // 2. 获取该活动的 ticket
  const { ticket } = lotteryStore.getActivityById(activityId.value);
  // 3. 获取二维码
  if (ticket) qrCodeSrc.value = WX_QRCODE_HREF + encodeURIComponent(ticket);
};
//#endregion

// 获取抽奖活动信息
onBeforeMount(() => {
  lotteryStore.fetchAllActivities();
  lotteryStore.fetchPrizeLevels();
});
</script>

<style scoped lang="less">
@import url('@/style/mixin.less');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
    animation: rotate 1.2s linear infinite;
  }
}

.action-btn {
  border: 2px solid #fff176;
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

:global(.tooltip-overlay) {
  top: 5vh !important;
  left: 7vw !important;
}
</style>
