import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  model:function() {
    var self = this;
    return this.store.findAll('idea');
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});