import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  model:function() {
    var self = this;
      var ideas = this.store.findAll('idea');
      console.log('ideas',ideas);
      var session = self.get('session');
      console.log('session',session);

      return this.store.findAll('idea');
  },
  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});