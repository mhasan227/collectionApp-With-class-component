import omit from 'lodash.omit';
import {Payload} from './slice';
import config from '../../../config';
const client = async ({payload}: {payload: Payload}, token: string) => {
  console.log('token', token);
  console.log('payload', process.env.REACT_APP_API_PATH);
  console.log('payload', payload);
  const {url, params, headers = {}} = payload;
  const query: any = {
    ...omit(payload, ['url']),
    timeout:   200000,
	keepalive: true,
    method: payload.method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(token ? {token: `Bearer ${token}`} : {}),
    },
    ...(payload.body
      ? {
          body: JSON.stringify(payload.body),
        }
      : {}),
  };
  let queryParams = '';
  if (params) {
    queryParams =
      '?' +
      Object.keys(params)
        .map(function (key) {
          return (
            encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
          );
        })
        .join('&');
  }
  const targetedUrl =
    payload.extra && payload.extra.absolutePath
      ? url
      : `${config.API_HOST}${config.API_PATH}${url}${queryParams}`;
  const r = fetch(new Request(`${targetedUrl}`, query))
    .then(async (response) => {
      console.log(response, "fail issue ==> response");
      const contentType = response.headers.get('content-type');
      const isOk = response.ok;
      console.log('response', isOk);
      console.log('response', response);
      console.log('response>>', contentType);
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then((data) => {
          if (isOk) {
            return data || {};
          }
          throw {
            status: response.status,
            ...data,
          };
        });
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error, "fail issue ==> error");
      throw error;
    });
	return r;
};

export default client;
