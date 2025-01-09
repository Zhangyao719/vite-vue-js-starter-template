import { get } from '@/utils/request';

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
