import { get, post } from '@/utils/request';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache('localStorage');

/**
 * @description 用户签到
 * @param {string} code 微信授权code
 * @param {string | number} activityId 活动id
 * @return {Promise<{nickname: string; headimgurl: string; activityId: number; accessToken: string; refreshToken: string; currentNum: number; createTime: number>}}
 */
export const signIn = (code) =>
  post('/prize-draw-user/create', undefined, { code, activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID) });

/**
 * @description 获取用户的中奖信息
 * @param {number} openId 用户微信的openId
 */
export const getPrizeInfoByOpenId = (openId) => {
  return get('/prize-draw-user/checkWinner', { activityId: wsCache.get(CACHE_KEY.ACTIVITY_ID), openId });
};
