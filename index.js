import isInteractive from './is-interactive.js';
import Spinner from './spinner.js';
import PlainSpinner from './plain-spinner.js';

const spinnerFactory = (...options) => {
  let SpinnerFunction = isInteractive() ? Spinner : PlainSpinner
  return new SpinnerFunction(...options)
}

export default spinnerFactory;
