import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
  	session: service('session'),

	errorMessage:'',
	identification:'',
	password:'',
	visible:false,

	actions:{
		login: function() {
		  let { identification, password } = this.getProperties('identification', 'password');
		  return this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
		    this.set('errorMessage', reason.error);
		  });
		},
		cancel:function(){
			console.log('cancel');
			this.set('visible',false);
		},
		submit:function(){
			var self = this;
			var identification = self.get('identification');
			var password = self.get('password');
			console.log(identification + password);

		}
	}
});
