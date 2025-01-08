// 各类项目相关配置
import { defineStore } from 'pinia';
import store from '../index';
import { MusicConfig } from '@/views/screen/constant';

export const useAppStore = defineStore('app', {
  state: () => ({
    appConfig: {
      music: MusicConfig.Bgm,
    },
  }),
  actions: {
    setAppConfig(config = {}) {
      Object.assign(this.appConfig, config);
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
