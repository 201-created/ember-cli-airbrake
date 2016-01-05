/* global airbrakeJs */

import Ember from 'ember';
const { K } = Ember;

let NullClient = Ember.Object.extend({
  notify:     K,
  addFilter:  K,
  setSession: K,
});

function validateAirbrakeConfig(airbrakeConfig) {
  Ember.assert('airbrake projectId must be set in config',
               !!airbrakeConfig.projectId);
  Ember.assert('airbrake projectKey must be set in config',
               !!airbrakeConfig.projectKey);
}

export default function getClient(config, options={}) {
  let airbrakeConfig = config.airbrake;

  if (!airbrakeConfig) {
    return NullClient.create();
  } else {
    validateAirbrakeConfig(airbrakeConfig);

    let projectId  = airbrakeConfig.projectId,
        projectKey = airbrakeConfig.projectKey;
    let client = new airbrakeJs.Client({projectId, projectKey});
    if (airbrakeConfig.host) {
      client.setHost(airbrakeConfig.host);
    }

    let reporters = options.reporters || [],
        filters   = options.filters || [];

    reporters.forEach(r => client.addReporter(r));
    filters.forEach(f => client.addFilter(f));

    return client;
  }
}
