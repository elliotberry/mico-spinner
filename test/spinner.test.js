const { red, green } = require('picocolors')

const logSymbols = require('../logSymbols')
const Spinner = require('../spinner')

jest.useFakeTimers()
const testString = 'LoL!'

jest.mock('process', () => ({
  stderr: {
    clearLine: jest.fn(),
    write: jest.fn(),
    cursorTo: jest.fn()
  }
}))

jest.mock('readline', () => ({
  clearLine: jest.fn(),
  write: jest.fn(),
  cursorTo: jest.fn()
}))

describe('spinner', () => {
  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('creates an empty spinner', () => {
    let spinner = Spinner().start()
    expect(spinner.text).toEqual('')
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  it('creates a spinner', () => {
    let spinner = Spinner(testString).start()
    expect(spinner.text).toEqual(testString)
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  it('intervalCallback', () => {
    let _Spinner = require('../spinner')

    let spinner = _Spinner(testString)
    let spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

    expect(spinner.intervalCallback(10, spinners)).toEqual(1)
  })

  it('scroll to first symbol after the loop', () => {
    let process = require('process')
    let _Spinner = require('../spinner')
    let spinner = _Spinner(testString)
    spinner.start()
    jest.advanceTimersByTime(1100)
    expect(process.stderr.write).toHaveBeenLastCalledWith(`${green('⠋')} LoL!`)
    spinner.stop()
  })

  it('scroll to last animation', () => {
    let process = require('process')
    let readline = require('readline')
    let _Spinner = require('../spinner')

    let spinner = _Spinner(testString)
    spinner.start()
    jest.advanceTimersByTime(1000)

    expect(readline.clearLine).toHaveBeenCalledTimes(10)
    expect(readline.cursorTo).toHaveBeenCalledWith(process.stderr, 0)
    spinner.stop()
  })

  it('stop and print something generic', () => {
    let process = require('process')
    let readline = require('readline')
    let _Spinner = require('../spinner')

    let spinner = _Spinner(testString)
    spinner.stopAndPrint({ color: 'red', symbol: 'X' })
    expect(readline.clearLine).toHaveBeenCalledWith(process.stderr)
    expect(process.stderr.write).toHaveBeenCalledWith(`${red('X')} LoL!\n`)
  })

  it('allow custom stream', () => {
    let readline = require('readline')
    let _Spinner = require('../spinner')
    let stream = { write: jest.fn() }
    let spinner = _Spinner(testString, { stream })
    spinner.stopAndPrint({ color: 'red', symbol: 'X' })
    expect(readline.clearLine).toHaveBeenCalledWith(stream)
    expect(stream.write).toHaveBeenCalledWith(`${red('X')} LoL!\n`)
  })

  it('#fail', () => {
    let spinner = Spinner(testString)
    let spy = jest.spyOn(spinner, 'stopAndPrint')
    spinner.fail()
    expect(spy).toHaveBeenCalledWith({ color: 'red', symbol: logSymbols.error })
  })

  it('#succeed', () => {
    let spinner = Spinner(testString)
    let spy = jest.spyOn(spinner, 'stopAndPrint')
    spinner.succeed()
    expect(spy).toHaveBeenCalledWith({
      color: 'green',
      symbol: logSymbols.success
    })
  })
})
