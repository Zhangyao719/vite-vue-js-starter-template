import axios from 'axios';
import { handleUnlogin } from '@/utils/authorize';
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
    // eslint-disable-next-line prefer-destructuring
    const code = data.code;
    const msg = data.msg || '系统未知错误';
    switch (code) {
      case 0:
        // 项目后端返回成功
        return data.data;
      case 200:
        // 其他服务器返回成功
        return data;
      case 401:
        DialogPlugin.alert({
          width: '70%',
          header: '系统提示',
          body: '身份验证已过期，请重新授权登录~ 🌹',
          closeBtn: false,
          closeOnOverlayClick: false,
          closeOnEscKeydown: false,
          onConfirm() {
            handleUnlogin();
          },
        });
        break;
      default:
        // 失败
        if (!config.headers['X-Response-Handler']) {
          // 是否需要报错
          MessagePlugin.error(msg);
        }
        return Promise.reject(data);
    }
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
