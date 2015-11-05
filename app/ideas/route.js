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
  setupController: function(controller, model){
    this._super(controller, model); // do the default implementation since I'm overriding this func
    this.startRefreshing();
  },
  startRefreshing: function(){
    console.log('startRefreshing');
    this.set('refreshing', true);
    Em.run.later(this, this.refresh, 5000);
  },
  refresh: function(){
    console.log('refreshing boiii');
    if(!this.get('refreshing'))
      return;
    // this.refresh();
    this.store.findAll('idea');
    Em.run.later(this, this.refresh, 5000);
  },
  actions: {
    // resetIdeas:function(){
    //   console.log('resetIDEas inside the router');
    //   this.refresh();
    // },
    logout() {
      console.log('---route logout ideas');

      this.get('session').invalidate();
    },
    willTransition: function(){
      this.set('refreshing', false);
    }
  }
});