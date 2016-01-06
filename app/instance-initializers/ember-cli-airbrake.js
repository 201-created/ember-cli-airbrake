import Ember from 'ember';

function registerEmberOnError(notifyFn) {
  let originalOnError = Ember.onerror || Ember.K;
  Ember.onerror = function(err) {
    originalOnError(err);
    notifyFn(err);
  };
}

function registerWindowOnError(notifyFn) {
  window.onerror = function(message, file, line, column, error) {
    if (message === 'Script error.') {
      // Ignore.
      return;
    }

    error = error || {error: {
      message,
      fileName:     file,
      lineNumber:   line,
      columnNumber: column || 0
    }};

    notifyFn(error);
  };
}

function initialize(instance) {
  // see http://emberjs.com/deprecations/v2.x/#toc_ember-applicationinstance-container
  let lookup = instance.lookup ? (...args) => instance.lookup(...args) :
                                 (...args) => instance.container.lookup(...args);

  let notifyFn = (error) => {
    let airbrake = lookup('service:airbrake');
    airbrake.notify(error);
  };

  registerEmberOnError(notifyFn);
  registerWindowOnError(notifyFn);
}

export default {
  name: 'ember-cli-airbrake',
  initialize
};
