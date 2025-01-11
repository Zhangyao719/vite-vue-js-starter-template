import { get } from '@/utils/request';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache();

/**
 * @description 获取所有活动列表
 * @return {Promise<{ id: number; activityName: string; ticket: string }>} 返回活动详情
 */
export const getAllActivities = () => {
  return get('/prize-draw-activity/getAllActivities');
};

/**
 * @description 根据活动id获取活动详情
 * @return {Promise<{ ticket: string; [key: string]: any }>} 返回活动详情
 */
export const getActivityDetail = () => {
  return get('/prize-draw-activity/get', { id: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 查询当前活动设立的抽奖等级
 */
export const getPrizeLevels = () => {
  return get('/system/dict-data/getPrizeLevel', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 场内抽奖
 * @param {Record<'winNum'|'prizePool', number>} params
 */
export const lotteryIndoor = (params) => {
  return get('/prize-draw-user/prizeDraw', { ...params, activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 场外抽奖
 * @param {Record<'winNum'|'prizePool', number>} params
 */
export const lotteryOutdoor = (params) => {
  return get('/prize-draw-out-user/prizeDraw', { ...params, activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};
