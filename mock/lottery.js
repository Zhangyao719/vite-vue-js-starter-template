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
  // 场内抽奖
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
  // 场外抽奖
  {
    url: '/prize-draw-out-user/prizeDraw',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Array.from({ length: 30 }).map((_, index) => ({
          nickname: '公孙乌龙' + index,
          workNum: '10205891',
          dept: '加弹车间' + index,
        })),
      };
    },
  },
  // 删除中奖人
  {
    url: '/prize-draw-user/deleteWinner',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: null,
        mgs: '删除成功',
      };
    },
  },
  // 获取所有场内签到用户（排除已中奖的用户）
  {
    url: '/prize-draw-user/getAllPrizeDraUser',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: Array.from({ length: 100 }).map((_, index) => ({
          id: index + 1,
          openid: 'openid' + index,
          nickname: '撒大大撒' + index,
          headimgurl: 'https://tdesign.gtimg.com/site/avatar.jpg',
        })),
      };
    },
  },
  // 获取所有场内中奖用户
  {
    url: '/prize-draw-user/getAllWinner',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: Array.from({ length: 5 }).map((_, index) => ({
          id: index + 1,
          openid: 'openid' + index,
          nickname: '尼格买提酷酷提' + index,
          headimgurl: 'https://tdesign.gtimg.com/site/avatar.jpg',
        })),
      };
    },
  },
  // 获取场外随机100名用户
  {
    url: '/prize-draw-out-user/getRandOutUser',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Array.from({ length: 100 }).map((_, index) => ({
          workNum: '10205891',
          nickname: '撒大萨达' + index,
          dept: '' + index,
        })),
      };
    },
  },
  // 获取所有场外中奖用户
  {
    url: '/prize-draw-out-user/getAllWinner',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Array.from({ length: 5 }).map((_, index) => ({
          workNum: '10205891',
          nickname: '撒贝宁杀乌鸡' + index,
          dept: '恒科指挥部安全中心' + index,
        })),
      };
    },
  },
];
