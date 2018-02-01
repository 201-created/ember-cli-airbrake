import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  airbrake: inject(),

  setupController(controller) {
    controller.set('airbrakeService', this.get('airbrake'));
  }
});
