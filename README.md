# ember-cli-airbrake

ember-cli-airbrake is an  [Ember CLI](http://www.ember-cli.com/) addon for integrating the [Airbrake JS](https://github.com/airbrake/airbrake-js) error notifier into your app.

## Installation

`npm install --save-dev ember-cli-airbrake`

## Configuration

ember-cli-airbrake is configured per environment. If it isn't configured for a particular environment it will not be built into your ember application for that environment.

You must specify your `project_id` and `project_key` for ember-cli-airbrake to work. Your `project_id` can be found in the url of your project/ app error page.

If you are using [Errbit](https://github.com/errbit/errbit), the open-source, Airbrake API compatible error catcher, you must also set the host parameter to your errbit installation.

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
