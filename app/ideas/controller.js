import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  	session: service('session'),
	sessionUser: service('session-user'),
	currentUser: Ember.computed.alias('sessionUser.currentUser'),
  	sortedIdeas:function(){
  		var self = this;
  		var ideas = self.get('model');
  		var currentUserVotes = self.get('currentUser.votes');
  		var what = self.get('currentUser.votes.idea');
console.log(what);
console.log(Ember.inspect(what));


  		ideas.forEach(function(idea1) {
			   	var ideaId1 = idea1.get('id');
			   	console.log(ideaId1);
	   	  		currentUserVotes.forEach(function(vote) {
   				    let ideaId2 = vote.get('idea.id');
		   			console.log("---",ideaId2);
   				   	
   				   	if(ideaId1 === ideaId2){
   				   		console.log('yep!');
   				   		// Ember.set(idea1,'isVotedOn',true);
   				   		// idea1.save();
   				    	// idea1.set('isVotedOn',true);

   				   	}
   				   	

   				});

			});

  		return ideas.sortBy('count').reverse();

  	}.property('model.@each.count'),

	actions:{
		vote:function(ideaId){
			console.log('---------vote',ideaId);
			var self = this;
			var currentUser = self.get('currentUser');
			var votes = currentUser.get('votes');
			var foundIdea = false;

			votes.forEach(function(vote) {
			    let idea = vote.get('idea');
			    let otherIdeaId = idea.get('id');

			    if(otherIdeaId === ideaId){
			    	console.log('FOUND IT SAME IDEAID');
			    	foundIdea = idea;
			    }
			});

			if(!foundIdea){

				var idea = this.store.peekRecord('idea', ideaId);
				var ideaCount = idea.get('count');
				idea.set('count',ideaCount+1);

				var newVote = self.store.createRecord('vote', {
					user: currentUser,
					idea: idea,
				});

				newVote.save();
			}

		},
		createIdea:function(){
			console.log('-----createIdea');
			var self = this;
			var currentUser = self.get('currentUser');

			var ideaTitle = self.get('ideaTitle');
			var ideaDescription = self.get('ideaDescription');

			var newIdea = self.store.createRecord('idea', {
			  title: ideaTitle,
			  description: ideaDescription,
			  count:0,
			  user:currentUser
			});
			newIdea.save();

		}
	}
});
