import axios, { AxiosRequestConfig } from 'axios';
import {
  AxiosCacheInstance,
  buildWebStorage,
  setupCache,
} from 'axios-cache-interceptor';

export type { AxiosCacheInstance } from 'axios-cache-interceptor';

// const axiosCacheStorage = buildMemoryStorage();

const axiosCacheStorage = buildWebStorage(sessionStorage, 'axios-cache:');

export const createAxios = (config: AxiosRequestConfig): AxiosCacheInstance => {
  const instance = axios.create(config);

  const withCache = setupCache(instance, {
    storage: axiosCacheStorage,
    methods: ['get', 'post'],
    interpretHeader: true,
    etag: true,
    modifiedSince: true,
  });

  // https://github.com/arthurfiorette/axios-cache-interceptor/issues/317
  withCache.interceptors.request.use((config) => {
    if (!config.cache) {
      return config;
    }

    async function reject() {
      const key = config.id ?? withCache.generateKey(config);
      const storage = await withCache.storage.get(key, config);

      // Request cancelled but response is already cached
      if (storage.state === 'cached' || storage.state === 'stale') {
        return;
      }
      await withCache.storage.remove(key, config);
    }

    if (config.signal) {
      // Already cancelled request
      if (config.signal.aborted) {
        config.cache = false;
        return config;
      }
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      config.signal.addEventListener('abort', reject);
    }

    return config;
  });

  return withCache;
};
