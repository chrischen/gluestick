import fs from 'fs';
import path from 'path';
// import logger from './cliLogger';
// import { highlight } from '../cli/colorScheme';

export function quitUnlessGluestickProject(/* command */) {
  if (!isGluestickProject()) {
    // TODO: Replace logger, remove disable
    // eslint-disable-next-line
    // logger.error(`${highlight(command)} commands must be run from the root of a gluestick project.`);
    process.exit();
  }
}

export function isGluestickProject(dir = process.cwd()) {
  try {
    fs.statSync(path.join(dir, '.gluestick'));
  } catch (err) {
    return false;
  }
  return true;
}