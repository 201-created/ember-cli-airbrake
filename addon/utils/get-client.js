/* global airbrakeJs */

import EmberObject from  '@ember/object';
import { assert } from '@ember/debug';

let NullClient = EmberObject.extend({
  notify() {},
  addFilter() {},
  setSession() {}
});

function validateAirbrakeConfig(airbrakeConfig) {
  assert('airbrake projectId must be set in config',
         !!airbrakeConfig.projectId);
  assert('airbrake projectKey must be set in config',
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
