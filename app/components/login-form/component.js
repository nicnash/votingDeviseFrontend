import Ember from 'ember';
import config from '../../config/environment';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  actions: {
    authenticate: function() {
      let { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    },
    createUser: function() { 
    	console.log('-----createUser');
    	let newEmail = this.get('newEmail');
        let newPassword = this.get('newPassword');
        let newPasswordConfirm = this.get('newPasswordConfirm');

        if(newPassword !== newPasswordConfirm){
            this.set('errorMessage', 'Passwords must be the same');
        }else if(newEmail.length<5){
            this.set('errorMessage', 'Email too short dawg.');
        }else{
        	Ember.$.ajax( {
        		url: config.api.host+'/users',
        		type: 'POST',
        		// data: { user:{email: "user4@example.com", password: "password", password_confirmation:"password" }},
        		data: { user:{email: newEmail, password: newPassword}},
        	    success: function(response) {
        	      console.log('SUCCESS');
        	    },
        	    error: function(reason) {
        	      console.log('FAILSURE');
        	    }
        	});
        }


    }


    // $.ajax({
    //        url: /'users',
    //        type: 'GET',
    //        accepts: 'application/json',
    //        success: function(data) {
    //            result.set('content', data);
    //            console.log('DEBUG: GET Enquiries OK');
    //        },
    //        error: function() {
    //            console.log('DEBUG: GET Enquiries Failed');
    //        }
    //    });

  }
});