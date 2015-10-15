import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  	session: service('session'),
	sessionUser: service('session-user'),

  	sortedIdeas:function(){
  		var self = this;
  		var ideas = self.get('model');

  		return ideas.sortBy('count').reverse();


  	}.property('model.@each.count'),
	actions:{
		vote:function(ideaId){
			console.log('---------vote',ideaId);
			var self = this;

			var idea = self.store.peekRecord('idea', ideaId);
			var ideaCount = idea.get('count');
			idea.set('count',ideaCount+1);


			var currUser = self.store.peekRecord('user',1);

			var newVote = self.store.createRecord('vote', {
				user: currUser,
				idea: idea,
			});
			console.log('savingVote curruser, idea');
			console.log(currUser);
			console.log(idea);

			newVote.save();
		},
		createIdea:function(){
			var self = this;

			console.log('-----createIdea');
			var ideaTitle = self.get('ideaTitle');
			var ideaDescription = self.get('ideaDescription');

			var aUser = self.store.peekRecord('user',1);
			var newIdea = self.store.createRecord('idea', {
			  title: ideaTitle,
			  description: ideaDescription,
			  count:0,
			  user:aUser
			});
			newIdea.save();

		}
	}
});
