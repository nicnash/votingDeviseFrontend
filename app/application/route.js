import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin,{
  	currentUser: service('session-user'),

	init:function(){
		console.log('APPLICATION ROUTE HOOK');
		var sessionUser = this.get('currentUser');

	}
});