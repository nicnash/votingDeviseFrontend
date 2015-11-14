import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  	session: service('session'),
  	notify: service('notify'),
	visible:false,

	actions:{
		cancel:function(){
			this.set('visible',false);
		},
		requestConfirmation: function(){
			console.log('requestConfirmation');
			this.get('notify').info('Request Sent!');
			// this.set('visible',false);
			
		}
	}
});
