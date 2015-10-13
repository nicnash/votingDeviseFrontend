import Ember from 'ember';

export default Ember.Route.extend({
	model:function() {
    	var self = this;
    	console.log('--------user model');
      var users = this.store.findAll('user');
      console.log('users',users);
      // var session = self.get('session');
      // console.log('session',sessionemail);

      return this.store.findAll('user');
  },
});
