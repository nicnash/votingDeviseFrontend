import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  model: function() {
    return bands;
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});