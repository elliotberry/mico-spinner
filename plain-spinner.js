import process from 'node:process';
import readline from 'node:readline';
import c from 'picocolors';

import logSymbols from './log-symbols.js';

function Spinner(textString = '', options = {}) {
  let text = textString

  let stream = options.stream || process.stderr

  return {
    fail() {
      return this.stopAndPrint({ color: 'red', symbol: logSymbols.error })
    },
    start() {
      stream.write(`${c.yellow('-')} ${text}\n`)
      return this
    },
    stop() {
      readline.clearLine(stream)

      return this
    },
    stopAndPrint({ color, symbol }) {
      let colorFunction = c[color]
      stream.write(`${colorFunction(symbol)} ${text}\n`)
      return this
    },
    succeed() {
      return this.stopAndPrint({ color: 'green', symbol: logSymbols.success })
    },
    text
  }
}

export default Spinner;
