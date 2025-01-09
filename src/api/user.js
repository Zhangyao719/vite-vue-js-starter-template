import { post } from '@/utils/request';

/**
 * @description 用户签到
 * @param {string} code 微信授权code
 * @param {string | number} activityId 活动id
 * @return {Promise<{nickname: string; headimgurl: string; activityId: number; accessToken: string; refreshToken: string; currentNum: number; createTime: number>}}
 */
export const signIn = (code, activityId) => post('/prize-draw-user/create', undefined, { code, activityId });

/** @description 获取所有签到用户 */
// export const getAllSignInUser = () => get('/prize-draw-user/list');
export const getAllSignInUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }).map((_, index) => ({
          nickname: `张三${index}`,
          headimgurl:
            Math.floor(Math.random() * 2) % 2 === 0
              ? 'https://tdesign.gtimg.com/demo/demo-image-1.png'
              : 'https://tdesign.gtimg.com/site/avatar.jpg',
        })),
      );
    }, 3000);
  });
};
