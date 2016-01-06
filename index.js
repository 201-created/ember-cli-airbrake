/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-airbrake',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/airbrake-js-client/dist/client.min.js');
  }
};
