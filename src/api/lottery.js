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
 * @description 抽奖
 * @param {number | string} activityId 活动id
 * @param {number | string} activityType 活动类型
 * @param {number} num 活动人数
 */
export const lottery = (activityId, activityType, num) => {
  // todo: 切换接口
  // return get('/system/dict-data/simple-list', {});
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 3 }).map((_, index) => ({
          nickname: `张三${index}`,
          headimgurl:
            Math.floor(Math.random() * 2) % 2 === 0
              ? 'https://tdesign.gtimg.com/demo/demo-image-1.png'
              : 'https://tdesign.gtimg.com/site/avatar.jpg',
        })),
      );
    }, 1000);
  });
};
