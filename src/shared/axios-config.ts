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

  return setupCache(instance, {
    storage: axiosCacheStorage,
    methods: ['get', 'post'],
    interpretHeader: true,
    etag: true,
    modifiedSince: true,
  });
};
