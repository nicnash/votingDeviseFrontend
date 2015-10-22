import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  sessionUser: service('session-user'),
  model:function() {
    var self = this;
    // return this.store.findAll('idea');
    return Ember.RSVP.hash({currentUser:self.get('sessionUser.currentUser'),ideas:this.store.findAll('idea')});
  },
  actions: {
    logout() {
      console.log('---route logout ideas');

      this.get('session').invalidate();
    }
  }
});