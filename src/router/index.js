import { createRouter, createWebHistory } from 'vue-router';
import { getTokens } from '@/utils/authorize';
// import { useDictStoreWithOut } from '@/store/modules/dict';

const files = import.meta.glob('./modules/*.js', {
  eager: true,
});

// 路由暂存
const routeModuleList = [];

// 遍历路由模块
Object.keys(files).forEach((key) => {
  const module = files[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  routeModuleList.push(...moduleList);
});

// 路由白名单
// const whiteList = ['/screen/welcome', '/screen/lottery', '/user/authorize', '/404'];

// 存放动态路由
const asyncRouterList = [...routeModuleList];

// 存放固定路由
const defaultRouterList = [
  {
    path: '/',
    redirect: '/user/authorize',
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
  },
];

const routes = [
  ...defaultRouterList,
  ...asyncRouterList,
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'NotFound' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach(async (to) => {
  // 提前准备数据（目前先写死）
  // const dictStore = useDictStoreWithOut();
  // if (!dictStore.getIsSetDict) await dictStore.setDictMap();

  // 目前所有页面都能进（除了已经登录的，不需要再进入授权页）
  const { accessToken } = getTokens();
  return accessToken && to.name === 'Authorize' ? { name: 'SignIn' } : true;
});

router.afterEach((to) => {
  if (to.meta?.title && document) {
    document.title = to.meta.title;
  }
});

export default router;
