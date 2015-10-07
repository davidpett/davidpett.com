import Ember from 'ember';
import config from './config/environment';

const {
  get,
  inject,
  run
} = Ember;

var Router = Ember.Router.extend({
  location: config.locationType,
  metrics: inject.service(),

  didTransition() {
    this._super(...arguments);
    this.trackPage();
  },

  trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function(){});

export default Router;
