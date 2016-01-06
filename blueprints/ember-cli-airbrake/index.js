/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('airbrake-js-client', 'airbrake-js#~0.5.8');
  }
};
