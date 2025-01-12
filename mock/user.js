export default [
  {
    url: '/prize-draw-user/create',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          headimgurl: 'https://tdesign.gtimg.com/site/avatar.jpg',
          nickname: '张三丰',
          currentNum: 1,
          openid: 'openid',
          createTime: '1970-01-01 00:00:00',
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        },
        msg: '',
      };
    },
  },
];
