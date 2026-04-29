import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const execFileAsync = promisify(execFile);

export async function getGitVersion() {
  const {stdout} = await execFileAsync('git', ['--version'], {
    timeout: 2000,
  });

  return stdout.trim();
}

