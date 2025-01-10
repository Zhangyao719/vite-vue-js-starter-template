export default [
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
  {
    url: '/prize-draw-out-user/getRandOutUser',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: Array.from({ length: 100 }).map((_, index) => ({
          workNum: '10205891',
          nickname: '撒大大撒' + index,
          dept: '部门艾克赛德' + index,
        })),
      };
    },
  },
];
