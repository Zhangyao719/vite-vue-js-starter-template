import { get } from '@/utils/request';

/**
 * @description 抽奖
 * @param {number | string} activityId 活动id
 * @param {number | string} activityType 活动类型
 * @param {number} num 活动人数
 */
export const lottery = (activityId, activityType, num) => {
  // todo: 切换接口
  return get('/system/dict-data/simple-list', {});
};
