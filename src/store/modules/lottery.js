// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getPrizeLevels } from '@/api/lottery';

export const useLotteryStore = defineStore('lottery', {
  state: () => ({
    prizeLevels: [],
  }),
  getters: {
    prizeLevelOptions: (state) => {
      return state.prizeLevels.map(({ label, value }) => ({
        label,
        value: +value,
      }));
    },
  },
  actions: {
    async fetchPrizeLevels(activityId) {
      if (this.prizeLevels.length) return;
      const data = await getPrizeLevels(activityId);
      this.prizeLevels = data || [];
    },
  },
});

export const useLotteryStoreWithOut = () => {
  return useLotteryStore(store);
};
