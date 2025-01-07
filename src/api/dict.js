import { get } from '@/utils/request';

/** @description 查询字典数据（精简)列表 */
export const getSimpleDictDataList = () => {
  return get('/system/dict-data/simple-list');
};
