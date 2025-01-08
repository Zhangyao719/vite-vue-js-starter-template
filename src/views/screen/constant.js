export const PrizeOptions = [
  { label: '纪 念 奖', value: 1, indoorNum: 80, outdoorNum: 80 },
  { label: '三 等 奖', value: 2, indoorNum: 30, outdoorNum: 90 },
  { label: '二 等 奖', value: 3, indoorNum: 8, outdoorNum: 28 },
  { label: '一 等 奖', value: 4, indoorNum: 2, outdoorNum: 4 },
  { label: '特 等 奖', value: 5, indoorNum: 1, outdoorNum: 1 },
];

export const getPrizeInfo = (value) => {
  return PrizeOptions.find((item) => item.value === value) ?? {};
};

// 抽奖环节
export const LotteryConfig = {
  Start: {
    component: 'Start',
    label: '开始',
  },
  Loading: {
    component: 'Loading',
    label: '停止',
  },
  Result: {
    component: 'Result',
    label: '返回',
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
