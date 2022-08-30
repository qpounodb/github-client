import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const setAuth = (token?: string): AxiosRequestHeaders =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const getGithubAPIConfig = <T extends any = any>(
  urlPrefix: string = '',
  config: AxiosRequestConfig<T> = {}
): AxiosRequestConfig<T> => {
  return {
    baseURL: `https://api.github.com${urlPrefix}`,
    headers: {
      Accept: 'application/vnd.github+json',
      ...setAuth(process.env.REACT_APP_GITHUB_API_ACCESS_TOKEN),
    },
    timeout: 5000,
    ...config,
  };
};
