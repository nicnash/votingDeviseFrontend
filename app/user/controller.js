import Ember from 'ember';
import config from '../config/environment';
const { service } = Ember.inject;
export default Ember.Controller.extend({
	session: service('session'),
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
			if(password !== confirmPassword)
			{
				errors.push('Yo passwords dont match bro');
			}

			var authStr = "Token token=\"" + currentUserToken + "\", email=\""+ currentUserEmail + "\"";

			if(errors.length === 0){
				Ember.$.ajax( {
		    		url: config.api.host+'/editpass',
		    		type: 'PATCH',
		    		beforeSend: function (xhr){ 
	    		        xhr.setRequestHeader('Authorization', authStr); 
	    		    },
		    		// data: { user:{email: "user4@example.com", password: "password", password_confirmation:"password" }},
		    		data: { user:{password: password, password_confirmation: newPassword}},
		    	    success: function(response) {
		    	      console.log(response);
		    	    	ctrl.get('session').invalidate();

		    	    },
		    	    error: function(reason) {
		    	    	console.log(reason);
		    	    	ctrl.get('session').invalidate();
		    	      // console.log('FAILSURE');
		    	      // var token = reason.responseText;
		    	      // ctrl.set('session.data.authenticated.token',token);
		    	      // var ca = document.cookie.split(';')
		    	      // console.log(ca);
		    	      // console.log('token',token);

		    	      // console.log(reason);
		    	    }
	    		});
			} else {
				ctrl.set('errors',errors);
			}


		}
	}
});
