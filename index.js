/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-airbrake',
  included: function(app) {
    app.import("vendor/airbrake-shim.js");
  }
};
