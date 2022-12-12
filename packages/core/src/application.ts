import 'reflect-metadata';
import {
  ArtusApplication,
  Manifest,
  Scanner,
} from '@artus/core';
import { MINIMAL_ENV } from './constant';
import { MinimalApplicationOptions } from './type';

export class MinimalApplication extends ArtusApplication {
  public manifest: Manifest;
  public options: MinimalApplicationOptions;
  public env: string;

  constructor(options: MinimalApplicationOptions) {
    super();
    this.options = Object.assign({
      root: process.cwd(),
      name: 'minimalApplication',
      configDir: 'src/config',
      extensions: ['.js', '.json', '.node', '.ts'],
      exclude: [],
    }, options);
    this.env = process.env[MINIMAL_ENV] ?? 'default';
  }

  public async start() {
    // 扫描
    const scanner = new Scanner({
      configDir: this.options.configDir,
      appName: this.options.name,
      extensions: this.options.extensions,
      exclude: this.options.exclude,
      needWriteFile: false,
      useRelativePath: true,
    });
    const multiEnvManifest = await scanner.scan(this.options.root!);
    this.manifest = multiEnvManifest[this.env];

    // 加载
    await this.load(this.manifest, this.options.root);
    await this.run();
    return this;
  }
}
