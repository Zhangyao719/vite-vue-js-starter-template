export default [
  {
    url: '/prize-draw-activity/getAllActivities',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: [
          {
            id: 11,
            activityName: '活动1',
          },
          {
            id: 12,
            activityName: '活动2',
          },
        ],
      };
    },
  },
  {
    url: '/system/dict-data/getPrizeLevel',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [
          { label: '一等奖', value: '1' },
          { label: '二等奖', value: '2' },
        ],
      };
    },
  },
  {
    url: '/prize-draw-user/prizeDraw',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Array.from({ length: 30 }).map((_, index) => ({
          id: index + 1,
          openid: 'openid' + index,
          nickname: '撒大大撒' + index,
          headimgurl: 'https://tdesign.gtimg.com/site/avatar.jpg',
        })),
      };
    },
  },
  {
    url: '/prize-draw-out-user/prizeDraw',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [
          { nickname: '公孙乌龙', workNum: '10205891', dept: '加弹车间' },
          { nickname: '张三丰', workNum: '10205891', dept: '啊实打实大撒旦' },
        ],
      };
    },
  },
];
