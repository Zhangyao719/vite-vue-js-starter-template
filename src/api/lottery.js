import { get, post } from '@/utils/request';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache('localStorage');

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
 * @description 获取所有场内签到用户（排除已中奖的用户）
 */
export const getAllSignInUsers = () => {
  return get('/prize-draw-user/getAllPrizeDraUser', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 随机获取 100 名场外的导入用户（排除已中奖的用户）
 */
export const getHundredOutdoorUsers = () => {
  return get('/prize-draw-out-user/getRandOutUser', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 获取所有场内中奖用户
 * @param {number} prizeLevel 奖品等级
 */
export const getAllIndoorWinners = (prizeLevel) => {
  return get('/prize-draw-user/getAllWinner', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID), prizeLevel });
};

/**
 * @description 获取所有场外中奖用户
 * @param {number} prizeLevel 奖品等级
 */
export const getAllOutdoorWinners = (prizeLevel) => {
  return get('/prize-draw-out-user/getAllWinner', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID), prizeLevel });
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

/**
 * @description 删除场内某个中奖人
 */
export const deleteWinner = (userId) => post('/prize-draw-user/deleteWinner', undefined, { userId });

/**
 * @description 查询场内签到人数
 */
export const getSignInNum = () => {
  return get('/prize-draw-user/getPrizeDrawUserCount', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 查询场外参与人数
 */
export const getOutdoorNum = () => {
  return get('/prize-draw-out-user/getPrizeDrawOutUserCount', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};
