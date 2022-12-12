import { Inject, ApplicationLifecycle, LifecycleHook, LifecycleHookUnit, Container } from '@artus/core';
import HTTPServer from './server';

@LifecycleHookUnit()
export default class Lifecycle implements ApplicationLifecycle {
  @Inject()
  private readonly container: Container

  // 在 Artus 生命周期 willReady 时启动 HTTP server
  @LifecycleHook()
  public async willReady() {
    const server = new HTTPServer(this.container);
    await server.start();
  }
}
