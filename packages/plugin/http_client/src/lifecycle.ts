import { Inject, ApplicationLifecycle, LifecycleHook, LifecycleHookUnit, Container } from '@artus/core';
import MinimalHTTPClient from './impl';

@LifecycleHookUnit()
export default class Lifecycle implements ApplicationLifecycle {
  @Inject()
  private readonly container: Container

  // 在 Artus 生命周期 didLoad 注入插件内容
  @LifecycleHook()
  public async didLoad() {
    const httpClient = new MinimalHTTPClient();

    this.container.set({
      id: MinimalHTTPClient,
      value: httpClient,
    });
  }
}
