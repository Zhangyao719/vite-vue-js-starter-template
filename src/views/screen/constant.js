/**
 * @description 抽奖环节（场外、场内）
 * @readonly
 * @enum {string}
 */
export const PrizeScene = {
  Indoor: 1,
  Outdoor: 2,
  1: '场内',
  2: '场外',
};

// 抽奖环节
export const LotteryConfig = {
  Start: {
    component: 'Start',
    buttonLabel: '开始',
  },
  // 场内——头像转场过渡
  LoadingAvatar: {
    component: 'LoadingAvatar',
    buttonLabel: '停止',
  },
  // 场外——条形图转场过渡
  LoadingBar: {
    component: 'LoadingBar',
    buttonLabel: '停止',
  },
  ResultAvatar: {
    component: 'ResultAvatar',
    buttonLabel: '返回',
  },
  ResultBar: {
    component: 'ResultBar',
    buttonLabel: '返回',
  },
};

// 大屏音乐
export const MusicConfig = {
  // 欢迎页
  Bgm: {
    src: 'https://pic.snsboat.com/saas/normal/customer/undefined/undefined/A76QZ8LWcsYNLHkvZ56QZ8lw/2023/2/17/9ed42a6bcfc3f2a18b618b580ce94092.mp3',
    loop: true,
  },
  // 开始抽奖
  Start: {
    src: 'https://pic.snsboat.com/saas/normal/customer/61/50/X77bXJ5EY6QZ8Pis5R5kQ/2024/3/21/ee394d911baf6d447639f750273153ea.mp3',
    loop: true,
  },
  // 抽奖中
  Loading: {
    src: 'https://pic.snsboat.com/NaN/12/12/756efc13ba49674a3f9d533904da65ae.mp3',
    loop: false,
  },
  // 抽奖结果
  Result: {
    src: 'https://pic.snsboat.com/saas/normal/customer/61/50/X77bXJ5EY6QZ8Pis5R5kQ/2024/3/21/9358ee33d3d5e2f89f7919fc319fdfd9.mp3',
    loop: false,
  },
};
