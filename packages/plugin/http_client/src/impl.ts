export default class MinimalHTTPClient {
  public fetch;

  constructor() {
    import('node-fetch').then(fetch => this.fetch = fetch.default);
  }
}
