import path from 'path';
import { MinimalApplication } from '../../packages/core/src/application';
import UserService from './service/user';

(async () => {
  const app = new MinimalApplication({
    root: path.resolve(__dirname),
    name: 'app',
    configDir: 'config',
  });
  await app.start();
})()