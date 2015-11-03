// import Ember from 'ember';

// export default Ember.Service.extend({
// });


import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
	session: service('session'),
	store: service(),
	// init:function(){
	// 	console.log('----session-user service init!');
	// 	var self = this;
	// 	var userEmail = this.get('session.data.authenticated.email');
	// 	if (!Ember.isEmpty(userEmail)) {
	// 		return DS.PromiseObject.create({

	// 	        // promise: this.get('store').find('user', 1).then(function(user){
	// 	        promise: this.get('store').queryRecord('user', { filter: { 'email': userEmail} }).then(function(user){
	// 	        	self.set('currentUser',user);
	// 	        })
	// 	      });
	// 	}
	// },
	currentEmail:function(){
		return this.get('session.data.authenticated.email');
	}.property('session','session.isAuthenticated'),

	currentToken:function(){
		return this.get('session.data.authenticated.token');
	}.property('session','session.isAuthenticated'),

	currentUser:function(){
		console.log('----session-user service currentUser!');

		var self = this;
		var userEmail = this.get('session.data.authenticated.email');
		if (!Ember.isEmpty(userEmail)) {

			return this.get('store').queryRecord('user', { filter: { 'email': userEmail} })
		}
	}.property('session','session.isAuthenticated')
});