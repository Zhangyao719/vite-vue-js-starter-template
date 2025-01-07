import WebStorageCache from 'web-storage-cache';

const CACHE_KEY = {
  USER: 'userInfo',
  DICT_CACHE: 'dictCache',
};

const useCache = (type = 'localStorage') => {
  const wsCache = new WebStorageCache({ storage: type });
  return {
    wsCache,
    CACHE_KEY,
  };
};

export default useCache;
