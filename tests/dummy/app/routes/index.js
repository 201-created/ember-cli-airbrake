import Ember from 'ember';

export default Ember.Route.extend({
  airbrake: Ember.inject.service(),

  setupController(controller) {
    controller.set('airbrakeService', this.get('airbrake'));
  }
});
