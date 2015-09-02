/* global Airbrake*/
import Ember from "ember";
import config from "../config/environment";

var isSetup = false;

function setupAirbrake(container) {
  Airbrake.addReporter(Airbrake.consoleReporter);
  Airbrake.setProject(config.airbrake.projectId, config.airbrake.projectKey);
  Airbrake.setEnvironmentName(config.environment);
  if (config.airbrake.host) {
    Airbrake.setHost(config.airbrake.host);
  }
  Airbrake.addEnvironment({
    user_agent: window.navigator.userAgent
  });

  var preprocessor = function(err) { return err; };
  if (config.airbrake.preprocessor) {
    preprocessor = container.lookup(config.airbrake.preprocessor);
  }
  function pushError(err) {
    Airbrake.push(preprocessor(err));
  }

  var originalOnError = Ember.onerror || Ember.K;
  Ember.onerror = function(err) { // any ember error
    originalOnError(err);
    pushError(err)
  };
  window.onerror = function(message, file, line, column, error){ // window general errors.
    if (message === 'Script error.') {
      // Ignore.
      return;
    }

    if (error) {
      pushError({error: error})
    } else {
      pushError({error: {
        message: message,
        fileName: file,
        lineNumber: line,
        columnNumber: column || 0
      }});
    }
  };
}

export function initialize(container) {
  if (config.airbrake && !isSetup) {
    isSetup = true;
    if (Airbrake.setProject) {
      setupAirbrake(container);
    } else {
      Airbrake.onload = function() {
        setupAirbrake(container)
      };
    }
  }
}

export default {
  name: 'airbrake',
  initialize: initialize
};
