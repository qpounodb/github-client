import axios, { AxiosRequestConfig } from 'axios';
import {
  AxiosCacheInstance,
  buildWebStorage,
  setupCache,
} from 'axios-cache-interceptor';

export type { AxiosCacheInstance } from 'axios-cache-interceptor';

// const axiosCacheStorage = buildMemoryStorage();

const axiosCacheStorage = buildWebStorage(sessionStorage, 'axios-cache:');

setupCache(axios, {
  storage: axiosCacheStorage,
  methods: ['get', 'post'],
  interpretHeader: false,
  ttl: 1000 * 60 * 60,
});

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
