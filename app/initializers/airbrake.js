/* global Airbrake*/
import Ember from "ember";
import config from "../config/environment";

var isSetup = false;

function setupAirbrake(){
  Airbrake.addReporter(Airbrake.consoleReporter);
  Airbrake.setProject(config.airbrake.projectId, config.airbrake.projectKey);
  Airbrake.setEnvironmentName(config.environment);
  if (config.airbrake.host) {
    Airbrake.setHost(config.airbrake.host);
  }
  Airbrake.addEnvironment({
    user_agent: window.navigator.userAgent
  });

  var originalOnError = Ember.onerror || Ember.K;
  Ember.onerror = function(err) { // any ember error
    originalOnError(err);
    Airbrake.push(err);
  };
  Ember.RSVP.on('error',function(err){ // any promise error
    Airbrake.push(err);
  });
  window.onerror = function(message, file, line, column, error){ // window general errors.
    if (message === 'Script error.') {
      // Ignore.
      return;
    }

    if (error) {
      Airbrake.push({error: error});
    } else {
      Airbrake.push({error: {
        message: message,
        fileName: file,
        lineNumber: line,
        columnNumber: column || 0
      }});
    }
  };
}

export function initialize(/* container, application */) {
  if (config.airbrake && !isSetup) {
    isSetup = true;
    if (Airbrake.setProject) {
      setupAirbrake();
    } else {
      Airbrake.onload = setupAirbrake;
    }
  }
}

export default {
  name: 'airbrake',
  initialize: initialize
};
