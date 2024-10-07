import process from 'node:process';

function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream &&
      stream.isTTY &&
      process.env.TERM !== 'dumb' &&
      !('CI' in process.env)
  )
}
export default function () { return isInteractive(); };
