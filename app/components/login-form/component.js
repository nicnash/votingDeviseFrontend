import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  newEmail:"user@example.com",
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
    	Ember.$.ajax( {
    		url: '/users',
    		type: 'POST',
    		// data: { user:{email: "user4@example.com", password: "password", password_confirmation:"password" }},
    		data: { user:{email: newEmail, password: "password"}},
    	    success: function(response) {
    	      console.log('SUCCESS');
    	    },
    	    error: function(reason) {
    	      console.log('FAILSURE');
    	    }
    	});


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