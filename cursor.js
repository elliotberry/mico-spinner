export function show(writableStream = process.stderr) {
  if (!writableStream.isTTY) {
    return
  }

  writableStream.write('\u001B[?25h')
}

export function hide(writableStream = process.stderr) {
  if (!writableStream.isTTY) {
    return
  }

  writableStream.write('\u001B[?25l')
}
