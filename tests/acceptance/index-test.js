import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import $ from 'jquery';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok($('#airbrake-service').length, 'has airbrake service on route');
  });
});

test('global airbrakeJs exists', (assert) => {
  visit('/');

  andThen(() => {
    assert.ok(window.airbrakeJs);
  });
});
