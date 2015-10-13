import Ember from 'ember';

export default Ember.Route.extend({
	model:function() {
    	var self = this;
    	console.log('--------vote model');
      var votes = this.store.findAll('vote');
      console.log('votes',votes);
      // var session = self.get('session');
      // console.log('session',sessionemail);

      return this.store.findAll('vote');
  },
});
