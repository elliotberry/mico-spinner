import isUnicodeSupported from './is-unicode-supported.js';

const dots =  ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const line = ['-', '\\', '|', '/']

const animation = isUnicodeSupported() ? dots : line

export default animation;
