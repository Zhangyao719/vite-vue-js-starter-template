import axios from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';

// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_PROXY_DOMAIN_REAL + import.meta.env.VITE_API_URL,
  // 指定请求超时的毫秒数
  timeout: 15000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const code = data.code || 500;
    const msg = data.msg || '系统未知错误';

    // 成功
    if (code === 200) return data.data || {};
    // 失败
    if (!config.headers['X-Response-Handler']) {
      // 是否需要报错
      MessagePlugin.error(msg);
    }
    return Promise.reject(data);
  },
  (error) => {
    console.log('axios err: ' + error);
    let { message } = error;
    if (message === 'Network Error') {
      message = '操作失败，系统异常！';
    } else if (message.includes('timeout')) {
      message = '操作超时，请稍后重试！';
    } else if (message.includes('Request failed with status code')) {
      message = '请求错误，请稍后重试' + message.substr(message.length - 3);
    } else if (message.indexOf('cancel') !== -1) {
      message = '';
    }
    if (message) MessagePlugin.error(message);
    return Promise.reject(error);
  },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
};

export default instance;
