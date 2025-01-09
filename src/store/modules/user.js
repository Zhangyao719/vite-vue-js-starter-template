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
      if (this.allSignInUser.length < count) {
        const cloneList = this.allSignInUser.slice(0);
        let addNum = count - cloneList.length;
        // 先从原数组中随机补充缺少的元素
        while (addNum--) {
          cloneList.push(this.allSignInUser[Math.floor(Math.random() * this.allSignInUser.length)]);
        }
        // 再将 cloneList 打乱
        for (let i = cloneList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cloneList[i], cloneList[j]] = [cloneList[j], cloneList[i]];
        }
        return cloneList;
      } else {
        const startIndex = Math.floor(Math.random() * (this.allSignInUser.length - count + 2));
        const endIndex = startIndex + count;
        return this.allSignInUser.slice(startIndex, endIndex);
      }
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
