/* eslint-env node */
'use strict';

let VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-cli-airbrake',

  included: function(app) {
    this._super.included(app);

    let checker = new VersionChecker(this);
    let dep = checker.for('ember-cli');

    if (dep.isAbove('2.15.0')) {
      app.import('node_modules/airbrake-js/dist/client.min.js');
    } else {
      app.import(app.bowerDirectory + '/airbrake-js-client/dist/client.min.js');
    }
  }
};
