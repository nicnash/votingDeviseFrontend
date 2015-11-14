import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  	session: service('session'),

	visible:false,

	actions:{
		cancel:function(){
			this.set('visible',false);
		},
		requestConfirmation: function(){
			console.log('requestConfirmation');
		}
	}
});
