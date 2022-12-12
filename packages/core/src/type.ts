import { BaseInput, BaseOutput } from '@artus/core/pipeline';
import MinimalMiddleware from './middleware';

export interface MinimalApplicationOptions {
  root?: string;
  name?: string;
  configDir?: string;
  extensions?: string[];
  exclude?: string[];
}

export type MiddlewareConstructable = new (...args: any) => MinimalMiddleware;
export interface MinimalApplicationConfig {
  middleware?: MiddlewareConstructable[];
  [key: string]: any;
}

export interface MinimalRequest {
  header: Record<string, any>;
  body: any;

  handleMethod: string;

  logId: string;
  stressTag: string;
  env: string;
  from: string;
  fromCluster: string;
  fromIdc: string;
  to: string;
  toCluster: string;
  toIdc: string;
}

export interface MinimalResponse {
  [key: string | symbol]: any;
}

export interface MinimalInput extends BaseInput {
  request: MinimalRequest;
  response: MinimalResponse;
}

export interface MinimalOutput extends BaseOutput {
  data: any;
}

export type NextFunction = () => Promise<void>;
