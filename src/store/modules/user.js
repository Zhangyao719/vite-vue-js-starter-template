// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { getAllSignInUsers, getHundredOutdoorUsers } from '@/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    allSignInUser: [], // 所有场内签到用户（>= 60, 不足的随机重复补上）
    randomOutdoorUsers: [], // 随机场外导入的用户（100个）
  }),
  getters: {
    signInUsersTotal: (state) => state.allSignInUser.length,
  },
  actions: {
    getRandomUsers(scene = 'indoor', count = 30) {
      const array = scene === 'indoor' ? this.allSignInUser : this.randomOutdoorUsers;
      const randoms = [];
      for (let i = 0; i < count; i++) {
        randoms.push(array[Math.floor(Math.random() * array.length)]);
      }
      return randoms;
    },
    async fetchAllSignInUsers() {
      const data = await getAllSignInUsers();
      this.allSignInUser = data || [];
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
