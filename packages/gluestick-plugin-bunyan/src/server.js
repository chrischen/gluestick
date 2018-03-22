/* @flow */

import bunyan from 'bunyan';
import path from 'path';

export type Options = {
  name: string,
  level?: string | number,
  stream?: Object,
  streams?: Object[],
  serializers?: Object,
  src?: boolean,
};

export type Logger = {
  success: Function,
  info: Function,
  warn: Function,
  debug: Function,
  error: Function,
};

type PluginUtilities = {
  requireModule: Function,
};

const defaultSettings: Options = {
  name: 'default name',
};

const bunyanPlugin = (
  opts: Object,
  { requireModule }: PluginUtilities,
): { logger?: Logger } => {
  let options: Options = { ...defaultSettings };
  try {
    const userSettings: Options = requireModule(
      path.join(process.cwd(), 'src/bunyan.config.js'),
    );
    options = Object.assign(options, userSettings);
  } catch (error) {
    // NOOP if we haven't settings from user we use default.
  }
  if (Object.keys(options).length <= Object.keys(defaultSettings).length) {
    return {};
  }
  const loggerWithSuccessMethod: Logger = bunyan.createLogger(options);
  loggerWithSuccessMethod.success = loggerWithSuccessMethod.info;
  return {
    logger: loggerWithSuccessMethod,
  };
};

bunyanPlugin.meta = { name: 'gluestick-plugin-bunyan' };

export default bunyanPlugin;
