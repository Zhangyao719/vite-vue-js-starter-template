export default [
  {
    path: '/user',
    name: 'UserIndex',
    component: () => import('@/views/user/Index.vue'),
    children: [
      {
        path: 'sign-in',
        component: () => import('@/views/user/SignIn.vue'),
        name: 'SignIn',
        meta: {
          title: '签到',
        },
      },
    ],
  },
];
