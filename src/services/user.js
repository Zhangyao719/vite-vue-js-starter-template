import { get } from '@/utils/request';

/**
 * @description 用户签到
 * @param {string} code 微信授权code
 * @param {string | number} activityId 活动id
 * @return {Promise<{nickname: string; headimgurl: string; activityId: number; accessToken: string; refreshToken: string; currentNum: number; createTime: string>}}
 */
export const signIn = (code, activityId) => get('/prize-draw-user/create', { code, activityId });
// export const signIn = (code, activityId) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve({
//       //   nickname: '张三',
//       //   headimgurl: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
//       //   currentNum: 10086,
//       //   activityId: 123,
//       //   accessToken: 'accessToken123',
//       //   refreshToken: 'refreshToken456',
//       //   createTime: '2021-01-01 12:00:00',
//       // });
//       reject({
//         code: 500,

//       })
//     }, 3000);
//   });
// };
