import Ember from 'ember';
import getClient from '../utils/get-client';
import setEnvironment from '../filters/environment';
import loggerReporter from '../reporters/logger';
import setSession from '../filters/session';

export default Ember.Service.extend({
  init: function() {
    this._super.apply(...arguments);
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

  // convenience API
  setSession(session) {
    this.client.addFilter(setSession(session));
  },

  // private
  _getClient() {
    let config = this.container.lookupFactory('config:environment');

    let client = getClient(config, {
      reporters: [loggerReporter],
      filters:   [setEnvironment(config.environment)]
    });

    return client;
  },
});
