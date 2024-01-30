import axios from 'axios';

export const configMethod = (method, url, headers = {}, others = {}) => {
  return axios({
    method,
    url,
    headers: { ...headers },
    withCredentials: false,
    ...others,
  });
};

export const get = (url, others = {}, headers = {}) =>
  configMethod('GET', url, headers, others);

export const post = (url, payload, others = {}, headers = {}) => {
  return configMethod('POST', url, headers, { data: payload, ...others });
};

export const put = (url, payload, others = {}, headers = {}) =>
  configMethod('PUT', url, headers, { data: payload, ...others });

export const del = (url, others = {}, headers = {}) =>
  configMethod('DELETE', url, headers, others);
