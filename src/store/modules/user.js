// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getAllSignInUsers, getRandomOutdoorUsers } from '@/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    allSignInUser: [], // 所有场内签到用户
    randomOutdoorUsers: [], // 100 随机场外导入的用户
  }),
  getters: {
    signInUsersTotal: (state) => state.allSignInUser.length,
  },
  actions: {
    getRandomSignInUsers(count = 30) {
      if (this.allSignInUser.length < count) {
        const cloneList = [];
        // 从原数组中随机补充缺少的元素
        while (count--) {
          cloneList.push(this.allSignInUser[Math.floor(Math.random() * this.allSignInUser.length)]);
        }
        return cloneList;
      } else {
        // 随机抽取长度为 count 的子数组
        const startIndex = Math.floor(Math.random() * (this.allSignInUser.length - count + 2));
        const endIndex = startIndex + count;
        return this.allSignInUser.slice(startIndex, endIndex);
      }
    },
    async fetchAllSignInUsers(activityId) {
      const data = await getAllSignInUsers(activityId);
      this.allSignInUser = data;
    },
    async fetchRandomOutdoorUsers(activityId) {
      const data = await getRandomOutdoorUsers(activityId);
      this.randomOutdoorUsers = data;
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
