import { get } from '@/utils/request';
import { ACTIVITY_ID } from '@/utils/constant';

/**
 * @description 根据活动id获取活动详情
 * @return {Promise<{ ticket: string; [key: string]: any }>} 返回活动详情
 */
export const getActivityDetail = (id = ACTIVITY_ID.YEAR2025) => {
  return get('/prize-draw-activity/get', { id });
};

/**
 * @description 根据 ticket 生成二维码图片
 */
export const getWxQrCodeImg = (ticket) => {
  return get(`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`);
};

/**
 * @description 查询当前活动设立的抽奖等级
 */
export const getPrizeLevels = (activityId) => get('/system/dict-data/getPrizeLevel', { activityId });

/**
 * @description 场内抽奖
 * @param {Record<'activityId'|'winNum'|'prizePool', number>} params
 */
export const lotteryIndoor = (params) => {
  return get('/prize-draw-user/prizeDraw', params);
};

/**
 * @description 场外抽奖
 * @param {Record<'activityId'|'winNum'|'prizePool', number>} params
 */
export const lotteryOutdoor = (params) => {
  return get('/prize-draw-out-user/prizeDraw', params);
};
