<template>
  <section class="h-full text-center relative">
    <span class="absolute text-#fff176 text-[30px] font-bold left-1/2 -translate-x-1/2">
      {{ prizeLevel?.label ?? '' }} —
      {{ PrizeScene[prizeScene] }}
    </span>
    <img
      src="https://pic.snsboat.com/saas/normal/customer/61/15607/X77bXJ5EY6QZ8Pis5R5kQ/2024/4/16/75c169b82a471d64c2462d54b9147588.png?v=51&imageMogr2/auto-orient/ignore-error/1"
      alt=""
    />

    <!-- 抽奖部分 -->
    <component :is="activeTab.component"></component>

    <!-- 操作按钮 -->
    <t-button
      :loading="loading"
      block
      class="operation w-200px!"
      style="margin: 0 auto"
      shape="round"
      size="large"
      :disabled="disabled"
      @click="handleClick(activeTab.component)"
    >
      {{ activeTab.label }}
    </t-button>
  </section>
</template>

<script setup>
import { ref, inject, computed, toRefs } from 'vue';
import Start from './components/LotteryStart.vue';
import Loading from './components/LotteryLoading.vue';
import Result from './components/LotteryResult.vue';
import { LotteryConfig, MusicConfig, PrizeScene } from './constant';
import useMusic from '@/hooks/useMusic';
import { useUserStore } from '@/store/modules/user.js';
import { lotteryIndoor, lotteryOutdoor } from '@/api/lottery';
import { ACTIVITY_ID } from '@/utils/constant';

defineOptions({
  name: 'Lottery',
  components: {
    Start,
    Loading,
    Result,
  },
});

const { selectMusic } = useMusic();

const prizeInfo = inject('prizeInfo', {
  prizeLevel: {},
  prizeNum: undefined,
  prizeScene: PrizeScene.Indoor,
});
const { prizeLevel, prizeNum, prizeScene } = toRefs(prizeInfo);

// 没有选择抽奖等级和中奖人数
const disabled = computed(() => {
  return !prizeLevel.value?.label || !prizeNum.value;
});

// #region 抽奖环节
const userStore = useUserStore();
const activeTab = ref(LotteryConfig.Start);
const loading = ref(false);
const winningUsers = ref([]); // 中奖名单
const setWinningUsers = (list) => {
  winningUsers.value = list;
};
const reset = () => {
  activeTab.value = LotteryConfig.Start;
  selectMusic(MusicConfig.Start);
};
const handleClick = async (tab) => {
  switch (tab) {
    case LotteryConfig.Start.component:
      // 1. 开始抽奖 → 抽奖中
      loading.value = true;
      try {
        // 先获取抽奖池人员（用于转场过渡）
        if (prizeScene.value === PrizeScene.Indoor) {
          await userStore.fetchAllSignInUsers(ACTIVITY_ID.YEAR2025);
          // 场内抽奖前判断人数是否满足抽奖条件
          if (prizeNum.value > userStore.signInUsersTotal) {
            return MessagePlugin.error('中奖人数不能大于签到人数');
          }
        } else {
          // 场外人数众多，无需校验
          await userStore.fetchRandomOutdoorUsers(ACTIVITY_ID.YEAR2025);
        }
        activeTab.value = LotteryConfig.Loading;
        selectMusic(MusicConfig.Loading);
      } finally {
        loading.value = false;
      }
      break;
    case LotteryConfig.Loading.component:
      // 2. 抽奖中 → 抽奖结果
      loading.value = true;
      try {
        const params = {
          activityId: ACTIVITY_ID.YEAR2025,
          prizePool: prizeLevel.value?.value,
          winNum: prizeNum.value,
        };
        winningUsers.value = await (prizeScene.value === PrizeScene.Indoor
          ? lotteryIndoor(params)
          : lotteryOutdoor(params));
        activeTab.value = LotteryConfig.Result;
        selectMusic(MusicConfig.Result);
      } catch (e) {
        reset();
      } finally {
        loading.value = false;
      }
      break;
    case LotteryConfig.Result.component:
      //  3. 抽奖结果 → 返回开始抽奖
      reset();
      break;
    default:
      break;
  }
};
provide('winningUsers', {
  winningUsers,
  setWinningUsers,
});
// #endregion

onMounted(() => {
  selectMusic(MusicConfig.Start);
});
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
