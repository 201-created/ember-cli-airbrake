/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-airbrake',
  included: function(app) {
    var config = this.project.config(this.app.env);

    if (config.airbrake) {
      app.import("vendor/airbrake-shim.js");
    }
  }
};
