import { getOwner } from '@ember/application';
import Service from '@ember/service';
import getClient from '../utils/get-client';
import setEnvironment from '../filters/environment';
import loggerReporter from '../reporters/logger';
import setSession from '../filters/session';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.client = this._getClient();
  },

  // airbrakeJs client API
  notify(...args) {
    this.client.notify(...args);
  },

  // airbrakeJs client API
  addFilter(...args) {
    this.client.addFilter(...args);
  },

  // airbrakeJs client API
  addReporter(...args) {
    this.client.addReporter(...args);
  },

  // convenience API
  setSession(session) {
    this.client.addFilter(setSession(session));
  },

  // private
  _getClient() {
    let config = getOwner(this).resolveRegistration('config:environment');

    let client = getClient(config, {
      reporters: [loggerReporter],
      filters:   [setEnvironment(config.environment)]
    });

    return client;
  },
});
