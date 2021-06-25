const process = require('process')
const readline = require('readline')
const c = require('colorette')

const logSymbols = require('./logSymbols')

function Spinner(textStr = '', opts = {}) {
  let text = textStr
  let timer = null

  let stream = opts.stream || process.stderr

  return {
    text,
    timer,
    stopAndPrint({ color, symbol }) {
      let colorFn = c[color]
      stream.write(`${colorFn(symbol)} ${this.text}\n`)
      return this
    },
    fail() {
      return this.stopAndPrint({ color: 'red', symbol: logSymbols.error })
    },
    succeed() {
      return this.stopAndPrint({ color: 'green', symbol: logSymbols.success })
    },
    start() {
      stream.write(`${c.yellow('-')} ${this.text}\n`)
      return this
    },
    stop() {
      readline.clearLine(stream)

      return this
    }
  }
}

module.exports = Spinner
