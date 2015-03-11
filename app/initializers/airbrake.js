import Ember from "ember";
import config from "../config/environment.js";

var isSetup = false;

function setupAirbrake(){
  Airbrake.setProject(config.airbrake.projectId, config.airbrake.projectKey);
  Airbrake.setEnvironmentName(config.environment);
  Airbrake.addEnvironment({
    user_agent: window.navigator.userAgent
  });
  Ember.onerror = function(err) { // any ember error
    Airbrake.push(err);
  };
  Ember.RSVP.on('error',function(err){ // any promise error
    Airbrake.push(err);
    console.error(e.message);
    console.error(e.stack);
  });
  window.onerror = function(message, file, line){ // window general errors.
    Airbrake.push({error: {message: message, fileName: file, lineNumber: line}});
  };
};

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
