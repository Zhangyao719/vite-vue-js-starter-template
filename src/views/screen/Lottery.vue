<template>
  <section class="h-full text-center relative">
    <span class="absolute text-#fff176 text-2vw font-bold left-1/2 -translate-x-1/2 tracking-2">
      {{ prizeLevel?.label ?? '' }} —
      {{ PrizeScene[prizeScene] }}
    </span>
    <img
      class="mb-3vh"
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/75c169b82a471d64c2462d54b9147588.png?v=51&imageMogr2/auto-orient/ignore-error/1"
      alt=""
    />

    <h3
      class="text-#F3F586 text-2vh fixed font-bold top-32% right-3% select-none tracking-1 p-4 bg-black/45 rounded-2xl"
      style="writing-mode: vertical-rl; text-orientation: upright"
    >
      恒科信息部技术开发
    </h3>

    <!-- 抽奖部分 -->
    <component :is="activeTab.component" ref="stepRef" :isRecordPage="isRecordPage"></component>

    <!-- 操作按钮 -->
    <t-button
      :loading="loading"
      block
      class="operation w-15vw! absolute! bottom-12vh left-1/2 -translate-x-1/2"
      shape="round"
      size="large"
      :disabled="disabled"
      @click="handleClick(activeTab.component)"
    >
      {{ activeTab.buttonLabel }}
    </t-button>
  </section>
</template>

<script setup>
import { ref, shallowRef, inject, computed, toRefs, useTemplateRef, defineExpose, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import useMusic from '@/hooks/useMusic';
import { useUserStore } from '@/store/modules/user.js';
import { lotteryIndoor, lotteryOutdoor } from '@/api';
import { LotteryConfig, MusicConfig, PrizeScene } from './constant';
import { isNullOrUnDef } from '@/utils/is';
import Start from './components/LotteryStart.vue';
import LoadingAvatar from './components/LotteryLoadingAvatar.vue';
import LoadingBar from './components/LotteryLoadingBar.vue';
import ResultAvatar from './components/LotteryResultAvatar.vue';
import ResultBar from './components/LotteryResultBar.vue';

defineOptions({
  name: 'Lottery',
  components: {
    Start,
    LoadingAvatar,
    LoadingBar,
    ResultAvatar,
    ResultBar,
  },
});

const router = useRouter();

const route = useRoute();
const isRecordPage = computed(() => route.query.scene === 'record');

const { selectMusic } = useMusic();

const stepRef = useTemplateRef('stepRef');

const prizeInfo = inject('prizeInfo', {
  activityId: undefined,
  prizeLevel: {},
  prizeScene: PrizeScene.Indoor,
  prizeNum: undefined,
});
const { activityId, prizeLevel, prizeNum, prizeScene } = toRefs(prizeInfo);

const disabled = computed(() => {
  if (stepRef.value && 'deleteLoading' in stepRef.value) {
    // 在 result 页面中进行删除操作时，禁用按钮
    return stepRef.value.deleteLoading;
  } else {
    return isNullOrUnDef(activityId.value) || !prizeLevel.value?.label || !prizeNum.value;
  }
});

const isIndoor = computed(() => prizeScene.value === PrizeScene.Indoor);

// #region 抽奖环节
const userStore = useUserStore();
const activeTab = ref(LotteryConfig.Start);
const loading = ref(false);
const winningUsers = shallowRef([]); // 中奖名单

const setWinningUsers = (list) => {
  winningUsers.value = list;
};

const reset = () => router.replace({ name: 'Lottery' });

const handleClick = useDebounceFn(async (tab) => {
  switch (tab) {
    case LotteryConfig.Start.component:
      // 1. 开始抽奖 → 抽奖中
      loading.value = true;
      try {
        // 先获取抽奖池人员（用于转场过渡）
        if (isIndoor.value) {
          await userStore.fetchAllSignInUsers();
          // 场内抽奖前判断人数是否满足抽奖条件
          if (prizeNum.value > userStore.signInUsersTotal) {
            return MessagePlugin.error('中奖人数不能大于签到人数');
          }
        } else {
          // 场外人数众多，无需校验
          await userStore.fetchRandomOutdoorUsers();
        }
        // 再切换至下一个环节
        activeTab.value = isIndoor.value ? LotteryConfig.LoadingAvatar : LotteryConfig.LoadingBar;
        selectMusic(MusicConfig.Loading);
      } finally {
        loading.value = false;
      }
      break;
    case LotteryConfig.LoadingAvatar.component:
    case LotteryConfig.LoadingBar.component:
      // 2. 抽奖中 → 抽奖结果
      loading.value = true;
      try {
        // 先获取中奖名单
        const params = {
          prizePool: prizeLevel.value?.value,
          winNum: prizeNum.value,
        };
        const data = await (isIndoor.value ? lotteryIndoor(params) : lotteryOutdoor(params));
        setWinningUsers(data);
        // 再切换至下一个环节
        activeTab.value = isIndoor.value ? LotteryConfig.ResultAvatar : LotteryConfig.ResultBar;
        selectMusic(MusicConfig.Result);
      } catch (e) {
        reset();
      } finally {
        loading.value = false;
      }
      break;
    case LotteryConfig.ResultAvatar.component:
    case LotteryConfig.ResultBar.component:
      // 3. 抽奖结果 → 返回开始抽奖
      reset();
      break;
    default:
      break;
  }
}, 500);

provide('winningUsers', {
  winningUsers,
  setWinningUsers,
});
defineExpose({
  resetLottery: reset,
});
// #endregion

//#region 中奖记录页的逻辑：
const winnerReocrd = inject('winnerReocrd', {});
// watchEffect(() => {
//   console.log('🚀 ~ winnerReocrd:', winnerReocrd);
//   // setWinningUsers(record.value); // 获取中奖记录
// });
watch(
  () => winnerReocrd.recordList,
  (qa) => {
    console.log('🚀 ~ qa:', qa);
  },
);
watch(
  isRecordPage,
  (bool) => {
    if (bool) {
      // 中奖记录页（直接带着记录去结果组件）
      // activeTab.value = indoorBool ? LotteryConfig.ResultAvatar : LotteryConfig.ResultBar;
      selectMusic(MusicConfig.Result);
    } else {
      // 抽奖页
      activeTab.value = LotteryConfig.Start;
      selectMusic(MusicConfig.Start);
    }
  },
  { immediate: true },
);
//#endregion
</script>

<style scoped lang="less">
@color: linear-gradient(to right, #fe2203, #fe8906);
@transparent: transparent;

.operation {
  background: @color;
  border-color: @transparent;

  &.t-is-disabled,
  &:hover {
    border-color: @transparent;
  }

  & > :deep(div > div) {
    background: @color !important;
  }
}
</style>
