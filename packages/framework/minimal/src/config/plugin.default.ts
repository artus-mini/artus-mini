import path from 'path';

export default {
  'applicationHTTP': {
    enable: true,
    path: path.resolve(__dirname, '../../../../protocol/application_http/src'),
  },

  'httpClient': {
    enable: true,
    path: path.resolve(__dirname, '../../../../plugin/http_client/src'),
  },
};
