import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  user: Ember.computed('session.data.authenticated.user_id', function() {
    console.log('---------user SERVICE');
    const userId = this.get('session.data.authenticated.user_id');
    if (!Ember.isEmpty(userId)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', userId)
      });
    }
  })
});