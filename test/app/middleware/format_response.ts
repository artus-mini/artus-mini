import MinimalMiddleware from "../../../packages/core/src/middleware";

export default class FormatResponseMiddleware implements MinimalMiddleware {
  public async use(ctx, next) {
    await next();
    ctx.body = {
      code: 'Success',
      message: 'success',
      data: {
        ...ctx.body,
      },
    };
  }
}