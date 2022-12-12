import path from 'path';

export default {
  applicationHTTP: {
    enable: true,
    path: path.resolve(__dirname, '../../../packages/protocol/application_http/src'),
  },

  httpClient: {
    enable: true,
    path: path.resolve(__dirname, '../../../packages/plugin/http_client/src'),
  },
};
