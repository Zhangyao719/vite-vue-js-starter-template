import { APP_INFO } from '@/utils/constant';
import useCache from '@/utils/storage';

const { wsCache, CACHE_KEY } = useCache();

/** @description 微信网页授权 */
export const authorize = () => {
  const { SERVICE_ID: appid, REDIRECT_URL } = APP_INFO;
  const redirectUri = encodeURIComponent(REDIRECT_URL + '?platform=choujiang'); // platform: choujiang，表示授权后跳转回抽奖平台（否则默认 wx 小程序）

  // prettier-ignore
  window.open(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`,
    '_self',
  )
};

/** @description 获取 token */
export const getTokens = () => {
  const tokens = { accessToken: '', refreshToken: '' };
  const userInfo = wsCache.get(CACHE_KEY.USER);
  if (userInfo) {
    tokens.accessToken = userInfo.accessToken || '';
    tokens.refreshToken = userInfo.refreshToken || '';
  }
  return tokens;
};

/** @description 清空用户信息 */
export const clearUserInfo = () => {
  wsCache.delete(CACHE_KEY.USER);
};

/** @description 登录鉴权 */
const checkLogin = () => {};

/** @description 处理未登录 */
export const handleUnlogin = () => {
  wsCache.clear();
  window.location.href = '/user/authorize';
};
