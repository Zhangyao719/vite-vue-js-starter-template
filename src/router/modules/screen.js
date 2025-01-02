export default [
  {
    path: '/screen',
    name: 'ScreenBackground',
    component: () => import('@/views/screen/Background.vue'),
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/screen/Welcome.vue'),
        name: 'ScreenWelcome',
        meta: {
          title: '活动主页',
        },
      },
      {
        path: 'lottery',
        component: () => import('@/views/screen/Lottery.vue'),
        name: 'Lottery',
        meta: {
          title: '大屏抽奖',
        },
      },
    ],
  },
];
