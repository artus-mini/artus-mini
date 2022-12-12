import { addTag, Injectable, ScopeEnum } from "@artus/core/injection";
import { MiddlewareConstructable } from '../../../core/src/type'

export const ROUTER_METADATA = Symbol.for('ROUTE_METADATA');
export const CONTROLLER_METADATA = Symbol.for('CONTROLLER_METADATA');
export const WEB_CONTROLLER_TAG = 'WEB_CONTROLLER_TAG';
export enum HTTPMethod {
  GET = 'GET'
}
export interface HTTPControllerOptions {
  path?: string;
  host?: string;
  middlewares?: MiddlewareConstructable[];
}

export function HTTPController(prefix?: string | HTTPControllerOptions) {
  let path: string;
  let middlewares: MiddlewareConstructable[];

  if (prefix) {
    if (typeof prefix === 'string') {
      path = prefix;
      middlewares = [];
    } else {
      path = prefix.path ?? '';
      middlewares = prefix.middlewares ?? [];
    }
  } else {
    path = '';
    middlewares = [];
  }

  return (target: any) => {
    const controllerMetadata = {
      path,
      middlewares,
    };

    Reflect.defineMetadata(CONTROLLER_METADATA, controllerMetadata, target);
    addTag(WEB_CONTROLLER_TAG, target);
    Injectable({ scope: ScopeEnum.EXECUTION })(target);
  }
}

// 多个 method 可以采用 factory 模式处理，示例仅展示最基础的 GET
export function GET(path: string) {
  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const routeMetadataList = Reflect.getMetadata(ROUTER_METADATA, descriptor.value) ?? [];
    routeMetadataList.push({
      path,
      method: HTTPMethod.GET,
    });
    Reflect.defineMetadata(ROUTER_METADATA, routeMetadataList, descriptor.value);
    return descriptor;
  }
}
