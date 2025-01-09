import { get, post } from '@/utils/request';

/**
 * @description 用户签到
 * @param {string} code 微信授权code
 * @param {string | number} activityId 活动id
 * @return {Promise<{nickname: string; headimgurl: string; activityId: number; accessToken: string; refreshToken: string; currentNum: number; createTime: number>}}
 */
export const signIn = (code, activityId) => post('/prize-draw-user/create', undefined, { code, activityId });

/**
 * @description 获取所有签到用户
 * @param {number} activityId 活动id
 */
export const getAllSignInUsers = (activityId) => {
  return get('/prize-draw-user/getAllPrizeDraUser', { activityId });
};

/**
 * @description 获取所有中奖用户
 * @param {number} activityId 活动id
 * @param {number} prizeLevel 奖品等级
 */
export const getAllWinners = (activityId, prizeLevel) => {
  return get('/prize-draw-user/getAllWinner', { activityId, prizeLevel });
};

/**
 * @description 获取某个用户的中奖信息
 * @param {number} activityId 活动id
 * @param {number} openId 用户微信的openId
 */
export const getPrizeInfoByOpenId = (activityId, openId) => {
  return get('/prize-draw-user/checkWinner', { activityId, openId });
};
