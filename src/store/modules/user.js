// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getAllSignInUsers, getHundredOutdoorUsers } from '@/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    allSignInUser: [], // 所有场内签到用户
    randomOutdoorUsers: [], // 随机场外导入的用户（100个）
  }),
  getters: {
    signInUsersTotal: (state) => state.allSignInUser.length,
  },
  actions: {
    // 随机抽取 count 个场内签到用户
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
        const startIndex = Math.floor(Math.random() * (this.allSignInUser.length - count + 2)); // random 为 [0, 1)，而且 100 取 20，start 最大能从 81 开始
        const endIndex = startIndex + count;
        return this.allSignInUser.slice(startIndex, endIndex);
      }
    },
    // 随机抽取 8 个场内签到用户
    getRandomOutdoorUsers() {
      const startIndex = Math.floor(Math.random() * 82);
      const endIndex = startIndex + 8;
      return this.randomOutdoorUsers.slice(startIndex, endIndex);
    },
    async fetchAllSignInUsers() {
      const data = await getAllSignInUsers();
      this.allSignInUser = data;
    },
    async fetchRandomOutdoorUsers() {
      const data = await getHundredOutdoorUsers();
      this.randomOutdoorUsers = data;
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
