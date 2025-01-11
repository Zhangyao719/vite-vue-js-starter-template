import { get, post } from '@/utils/request';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache();

/**
 * @description 用户签到
 * @param {string} code 微信授权code
 * @param {string | number} activityId 活动id
 * @return {Promise<{nickname: string; headimgurl: string; activityId: number; accessToken: string; refreshToken: string; currentNum: number; createTime: number>}}
 */
export const signIn = (code) =>
  post('/prize-draw-user/create', undefined, { code, activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });

/**
 * @description 获取所有场内签到用户（排除已中奖的用户）
 */
export const getAllSignInUsers = () => {
  console.log(wsCache.get(CACHE_KEY.ACTIVITY_ID));

  return get('/prize-draw-user/getAllPrizeDraUser', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 随机获取 100 名场外的导入用户（排除已中奖的用户）
 */
export const getHundredOutdoorUsers = () => {
  return get('/prize-draw-out-user/getRandOutUser', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });
};

/**
 * @description 获取所有中奖用户
 * @param {number} prizeLevel 奖品等级
 */
export const getAllWinners = (prizeLevel) => {
  return get('/prize-draw-user/getAllWinner', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID), prizeLevel });
};

/**
 * @description 获取某个用户的中奖信息
 * @param {number} openId 用户微信的openId
 */
export const getPrizeInfoByOpenId = (openId) => {
  return get('/prize-draw-user/checkWinner', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID), openId });
};
