import {appIsRunningLocally} from './auth';

export default function logException() {
  if (Raven != null && !appIsRunningLocally()) {
    Raven.captureException(ex, {
      extra: context
    });
  }

  /*eslint no-console:0*/
  // window.console && console.error && console.error(ex);
}
