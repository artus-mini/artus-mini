import path from 'path';
import Koa from 'koa';
import Router from 'koa-router-find-my-way';
import { Container } from '@artus/core';
import { CONTROLLER_METADATA, ROUTER_METADATA, WEB_CONTROLLER_TAG } from './decorator';

export default class HTTPServer {
  private app: Koa;
  private router: Router.Instance;
  private container: Container;

  constructor(container: Container) {
    this.container = container;
    this.app = new Koa();
    this.router = Router();
  }

  public async start() {
    // 读取已经附加 metadata 信息并注入到 container 的 controller
    const controllerClazzList = this.container.getInjectableByTag(WEB_CONTROLLER_TAG);
    for (const controllerClazz of controllerClazzList) {
      const controllerMetadata = Reflect.getMetadata(CONTROLLER_METADATA, controllerClazz);
      const controller = this.container.get(controllerClazz) as any;

      // 读取 controller 中的 function
      const handlerDescriptorList = Object.getOwnPropertyDescriptors(controllerClazz.prototype);
      for (const key of Object.keys(handlerDescriptorList)) {
        const handlerDescriptor = handlerDescriptorList[key];
        const routeMetadataList = Reflect.getMetadata(ROUTER_METADATA, handlerDescriptor.value) ?? [];
        if (routeMetadataList.length === 0) continue;

        // 注入 router
        this.registerRoute(controllerMetadata, routeMetadataList, controller[key].bind(controller));
      }
    }

    // 启动 HTTP Server
    this.app.use(this.router.routes());
    this.app.listen(3000, () => {
      console.log('Server listening on: http://localhost:3000');
    });
  }

  private registerRoute(controllerMetadata, routeMetadataList, handler) {
    for (const routeMetadata of routeMetadataList) {
      const routePath = path.normalize(controllerMetadata.path || '/' + routeMetadata.path);
      this.router.on(
        routeMetadata.method,
        routePath,
        ...controllerMetadata.middlewares.map(item => (new item()).use), handler
      );
    }
  }
}

