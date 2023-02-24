/* eslint-disable @typescript-eslint/no-explicit-any */
import rootPath from 'app-root-path';
import development from './development';
import test from './test';

interface Environment {
  rootPath?: string;
  PORT?: string;
  NODE_ENV?: string;
  HOST?: string;
  API_VERSION?: string;
}

const { APP_PORT: PORT, NODE_ENV } = process.env;

// Set current env variables
const currentEnv: any = {
  development,
  test,
}[NODE_ENV || 'development'];

const envs: Environment = {
  rootPath,
  PORT,
  NODE_ENV,
  ...currentEnv,
};

export default envs;
