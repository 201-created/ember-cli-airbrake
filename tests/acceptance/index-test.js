import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.dom('#airbrake-service').exists('has airbrake service on route');
  });

  test('global airbrakeJs exists', async assert => {
    await visit('/');

    assert.ok(window.airbrakeJs);
  });
});
