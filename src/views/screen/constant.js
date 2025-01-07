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
