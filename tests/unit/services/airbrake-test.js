import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | airbrake', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:airbrake');
    assert.ok(service);
  });

  ['addFilter', 'setSession', 'addReporter', 'notify'].forEach(methodName => {
    test(`it exposes #${methodName}`, function(assert) {
      let service = this.owner.lookup('service:airbrake');
      assert.ok(service[methodName]);
    });
  });
});
