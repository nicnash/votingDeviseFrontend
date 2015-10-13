import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  	sessionUser: service('session-user'),
	actions:{
		vote:function(ideaId){
			console.log('---------vote',ideaId);
			var self = this;
			var idea = this.store.peekRecord('idea', ideaId);
			// var count = self.get(idea.count);
			console.log('ideaCount',idea.count);
			idea.set('count', 55);
			console.log('idea',idea);

			// var sessionUser = self.get('sessionUser');
			// console.log('sessionUser',sessionUser);


			var store = this.store;
			var aUser = self.store.peekRecord('user',1);

			var newVote = store.createRecord('vote', {
			  user: aUser,
			  idea: idea,
			});
			console.log('newVote',newVote);
			newVote.save();
		}
	}
});
