import { defineStore } from 'pinia';
import store from '../index';
import { getSimpleDictDataList } from '@/api';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache();

export const useDictStore = defineStore('dict', {
  state: () => ({
    dictMap: new Map(),
    isSetDict: false,
  }),
  getters: {
    getDictMap() {
      const dictMap = wsCache.get(CACHE_KEY.DICT_CACHE);
      if (dictMap) this.dictMap = dictMap;
      return this.dictMap;
    },
    getIsSetDict() {
      return this.isSetDict;
    },
  },
  actions: {
    getDictByType(type) {
      if (!this.isSetDict) this.setDictMap();
      return this.dictMap[type];
    },
    async setDictMap() {
      const dictMap = wsCache.get(CACHE_KEY.DICT_CACHE);
      if (dictMap) {
        this.dictMap = dictMap;
        this.isSetDict = true;
      } else {
        const res = await getSimpleDictDataList();
        // 设置数据
        const dictDataMap = new Map();
        res.forEach((dictData) => {
          // 获得 dictType 层级
          const enumValueObj = dictDataMap[dictData.dictType];
          if (!enumValueObj)
            // 处理 dictValue 层级
            dictDataMap[dictData.dictType].push({
              value: dictData.value,
              label: dictData.label,
              colorType: dictData.colorType,
              cssClass: dictData.cssClass,
            });
        });
        this.dictMap = dictDataMap;
        this.isSetDict = true;
        wsCache.set(CACHE_KEY.DICT_CACHE, dictDataMap, { exp: 60 }); // 60 秒 过期
      }
    },
    async resetDict() {
      wsCache.delete(CACHE_KEY.DICT_CACHE);
      const res = await getSimpleDictDataList();
      // 设置数据
      const dictDataMap = new Map();
      res.forEach((dictData) => {
        // 获得 dictType 层级
        const enumValueObj = dictDataMap[dictData.dictType];
        if (!enumValueObj) {
          dictDataMap[dictData.dictType] = [];
        }
        // 处理 dictValue 层级
        dictDataMap[dictData.dictType].push({
          value: dictData.value,
          label: dictData.label,
          colorType: dictData.colorType,
          cssClass: dictData.cssClass,
        });
      });
      this.dictMap = dictDataMap;
      this.isSetDict = true;
      wsCache.set(CACHE_KEY.DICT_CACHE, dictDataMap, { exp: 60 }); // 60 秒 过期
    },
  },
});

export const useDictStoreWithOut = () => {
  return useDictStore(store);
};
