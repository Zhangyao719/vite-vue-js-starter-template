import WebStorageCache from 'web-storage-cache';

const CACHE_KEY = {
  USER: 'userInfo',
  DICT_CACHE: 'dictCache',
  ACTIVITY_ID: 'activityId',
};

const useCache = (type = 'sessionStorage') => {
  const wsCache = new WebStorageCache({ storage: type });
  return {
    wsCache,
    CACHE_KEY,
  };
};

export default useCache;
