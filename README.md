# ember-cli-airbrake

ember-cli-airbrake is an [Ember CLI](http://www.ember-cli.com/) addon for integrating the [Airbrake JS](https://github.com/airbrake/airbrake-js) error notifier into your app.

## Installation

 * install the addon: `ember install ember-cli-airbrake`
 * update your `config/environment.js' with an `airbrake` object that includes `projectId` and `projectKey`:

```javascript
// in "production" environment section, e.g.:
ENV.airbrake = {
  projectId:  '123456',
  projectKey: 'your-project-key'
}
```

Installing the addon will install the bower component for the airbrake client. This addon uses the airbrake client version **0.5.8**.

## Configuration

You most likely will want to only configure airbrake for your production environment.
The `window.onerror` and `Ember.onerror` handlers will only be set if there is an airbrake configuration for a particular environment.
In all cases, an `airbrake` service will be exposed. If airbrake isn't configured the airbrake service uses the Ember.K "no-op" function for its methods. This facilitates the usage of the airbrake service without having to add environment-checking code in your app.

If you are using [Errbit](https://github.com/errbit/errbit), the open-source Airbrake API compatible error catcher, you must also set the host parameter to your errbit installation.

Example configuration for the production environment:
```javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    /* ... */

  if (environment === 'production') {
    ENV.airbrake = {
      projectId:  'my_project_id',
      projectKey: 'my_project_key'
      // host: 'http://errors.myapp.com/'
    };
  }

  return ENV;
};
```

## Usage

After installing the addon and configuring it properly, errors will be reported to airbrake.
If you want to use the airbrake client to explicitly notify errors, you can use the exposed airbrake service.

### `airbrake` service

The airbrake service exposes the following methods:

  * `notify(error)` -- if you want to explicitly notify errors. Normally this will not be necessary
  * `addFilter(filterFn)` -- refer to the [airbrake client js documentation](https://github.com/airbrake/airbrake-js)
  * `addReporter(reporter)` -- refer to the [airbrake client js documentation](https://github.com/airbrake/airbrake-js)
  * `setSession(sessionData)` -- adds a filter to the client that sets the session data to all future error notifications

### example: include user data with error reports

The airbrake js client uses "filters" to optionally limit reported notifications or to modify the body of an individual notification.
To include user data with your error notices, add a filter that modifies `notice.session`.

Example:
```javascript
// in application route, or somewhere else that has determined a user is logged in
airbrake: Ember.inject.service(),

identifyUser: function(userData) {
  let airbrake = this.get('airbrake');
  airbrake.setSession(userData);
  // future notices will have their `notice.session` property set to the value of `userData`
}
```

### example: explicitly notify of an error

Normally the window.onerror or Ember.onerror handlers will do this for you, but if you want to
explicitly notify of an error, use the airbrake service's `notify` method:

```javascript
// ... some-component.js
airbrake: Ember.inject.service(),

notifyOfError: function() {
  let airbrake = this.get('airbrake');
  airbrake.notify(new Error('this is the error'));
}
```

## Testing

In any environment where `config.airbrake` is not set (such as your test environment, typically),
the error handlers for airbrake notification will not be set up. The `airbrake` service will still
exist, but all its methods will be no-ops (`Ember.K`). This way your tests will still run happily even
if they use, e.g. `airbrake.setSession` to set user session information.
