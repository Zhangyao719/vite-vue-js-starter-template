import { setRem } from '@/utils/layout';
import useCache from '@/utils/storage';
import { isEmpty } from '@/utils/is';

const { wsCache, CACHE_KEY } = useCache('localStorage');

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
        beforeEnter: ({ query: { activityId } }) => {
          // 授权页入口处存储 activityId
          if (!isEmpty(activityId)) {
            wsCache.set(CACHE_KEY.ACTIVITY_ID, Number(activityId));
          }
        },
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
