import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service('session'),
  sessionUser: service('session-user'),
  isAuthenticated: Ember.computed.alias('session.isAuthenticated'),
  
  model:function() {
    var self = this;
    var isAuthenticated = self.get('isAuthenticated')
    console.log('isAuthenticated',isAuthenticated);
    return Ember.RSVP.hash({currentUser:self.get('sessionUser.currentUser'),ideas:this.store.findAll('idea')});
  },
  setupController: function(controller, model){
    this._super(controller, model);
    this.startRefreshing();
  },
  startRefreshing: function(){
    console.log('startRefreshing');
    this.set('refreshing', true);
    Em.run.later(this, this.refresh, 45000);
  },
  refresh: function(){
    console.log('refreshing boiii');
    if(!this.get('refreshing'))
      return;
    this.store.findAll('idea');
    Em.run.later(this, this.refresh, 45000);
  },
  actions: {
    logout() {
      console.log('---route logout ideas');

      this.get('session').invalidate();
    },
    willTransition: function(){
      this.set('refreshing', false);
    }
  }
});