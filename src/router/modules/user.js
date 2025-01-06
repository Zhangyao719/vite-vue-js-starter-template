import { setRem } from '@/utils/layout';

export default [
  {
    path: '/user',
    name: 'UserIndex',
    component: () => import('@/views/user/Index.vue'),
    redirect: '/user/authorize',
    beforeEnter: () => {
      setRem();
    },
    children: [
      {
        path: 'authorize',
        component: () => import('@/views/user/Authorize.vue'),
        name: 'Authorize',
        meta: {
          title: '微信授权',
        },
      },
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
