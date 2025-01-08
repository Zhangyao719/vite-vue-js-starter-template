// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getAllSignInUser } from '@/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    allSignInUser: [],
  }),
  getters: {},
  actions: {
    getRandomUsers(count = 30) {
      const startIndex = Math.floor(Math.random() * (this.allSignInUser.length - count + 2));
      const endIndex = startIndex + count;
      return this.allSignInUser.slice(startIndex, endIndex);
    },
    async fetchAllSignInUser() {
      const data = await getAllSignInUser();
      this.allSignInUser = data;
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
