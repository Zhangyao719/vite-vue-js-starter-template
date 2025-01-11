// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getPrizeLevels, getAllActivities } from '@/api';

export const useLotteryStore = defineStore('lottery', {
  state: () => ({
    activities: [],
    prizeLevels: [],
  }),
  getters: {
    prizeLevelOptions: (state) => {
      return state.prizeLevels.map(({ label, value }) => ({
        label,
        value: +value,
      }));
    },
    activityOptions: (state) => {
      return state.activities.map(({ id, activityName }) => ({
        label: activityName,
        value: id,
      }));
    },
    getActivityById: (state) => (id) => {
      return state.activities.find((item) => item.id === id) || {};
    },
  },
  actions: {
    async fetchAllActivities() {
      if (this.activities.length) return;
      const data = await getAllActivities();
      this.activities = data || [];
    },
    async fetchPrizeLevels() {
      if (this.prizeLevels.length) return;
      const data = await getPrizeLevels();
      this.prizeLevels = data || [];
    },
  },
});

export const useLotteryStoreWithOut = () => {
  return useLotteryStore(store);
};
