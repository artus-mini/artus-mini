import { Inject } from '@artus/core';
import { GET, HTTPController } from '../../../packages/protocol/application_http/src/decorator';
import FormatResponseMiddleware from '../middleware/format_response';
import UserService from '../service/user';
import MinimalHTTPClient from '../../../packages/plugin/http_client/src/impl'

@HTTPController({
  middlewares: [FormatResponseMiddleware]
})
export default class IndexController {
  @Inject()
  private userService!: UserService;

  @Inject()
  private httpClient!: MinimalHTTPClient;

  @GET('/')
  public async index(ctx) {
    ctx.body = await this.userService.info();
  }

  @GET('/proxy')
  public async proxy(ctx) {
    const { url } = ctx.query;

    console.log(this.httpClient);

    const resp = await this.httpClient.fetch(url);
    const body = await resp.text();
    ctx.body = {
      html: body,
    };
  }
}