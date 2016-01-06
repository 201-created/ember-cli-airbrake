import { moduleFor, test } from 'ember-qunit';

moduleFor('service:airbrake', 'Unit | Service | airbrake', {
  // Specify the other units that are required for this test.
  needs: ['config:environment']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

['addFilter', 'setSession', 'addReporter', 'notify'].forEach(methodName => {
  test(`it exposes #${methodName}`, function(assert) {
    let service = this.subject();
    assert.ok(service[methodName]);
  });
});
