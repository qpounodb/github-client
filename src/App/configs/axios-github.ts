import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { CacheRequestConfig } from 'axios-cache-interceptor';

const setAuth = (token?: string): AxiosRequestHeaders =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const getAxiosGithubConfig = <T = unknown>(
  urlPrefix = '',
  config: AxiosRequestConfig<T> = {}
): AxiosRequestConfig<T> => {
  return {
    baseURL: `https://api.github.com${urlPrefix}`,
    headers: {
      Accept: 'application/vnd.github+json',
      ...setAuth(process.env.GITHUB_API_ACCESS_TOKEN),
    },
    timeout: 5000,
    ...config,
  };
};

export const getAxiosGithubSearchCacheConfig = (): CacheRequestConfig => {
  return {
    cache: {
      ttl: 1000 * 60 * 5, // 5 Minutes
      interpretHeader: false,
      etag: false,
      modifiedSince: false,
    },
  };
};
