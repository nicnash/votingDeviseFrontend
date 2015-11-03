import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
	sessionUser: service('session-user'),

	password:'password',
	confirmPassword:'password',

	actions:{
		changePassword:function(){
			// console.log("hullabaloo");
			var ctrl = this;
			var errors = Ember.A();
			console.log("errors",errors);
			var currentUserToken = ctrl.get('sessionUser.currentToken');
			var currentUserEmail = ctrl.get('sessionUser.currentEmail');
			var password = ctrl.get('password');
			var newPassword = ctrl.get('newPassword');
			var confirmPassword = ctrl.get('confirmPassword');

			if(password.length<8){
				errors.push('Passwords must be at least 8 characters long');
			}
			if(password != confirmPassword)
			{
				errors.push('Yo passwords dont match bro');
			}

			var authStr = "Token token=\"" + currentUserToken + "\", email=\""+ currentUserEmail + "\"";

			if(errors.length === 0){
				Ember.$.ajax( {
	    		url: 'http://localhost:3000/editpass',
	    		type: 'PATCH',
	    		beforeSend: function (xhr){ 
    		        xhr.setRequestHeader('Authorization', authStr); 
    		    },
	    		// data: { user:{email: "user4@example.com", password: "password", password_confirmation:"password" }},
	    		data: { user:{password: password, password_confirmation: newPassword}},
		    	    success: function(response) {
		    	      console.log('SUCCESS');
		    	    },
		    	    error: function(reason) {
		    	      console.log('FAILSURE');
		    	    }
	    		});
			} else {
				ctrl.set('errors',errors);
			}
		}
	}
});
