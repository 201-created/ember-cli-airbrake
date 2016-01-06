import Ember from 'ember';

function formatError(error) {
  return `[ember-cli-airbrake] reported error: "${error.message}"`;
}

export default function reportNotice(notice) {
  notice.errors.forEach(error => Ember.Logger.error(formatError(error)));
}
