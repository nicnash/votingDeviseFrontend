import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  	session: service('session'),
	sessionUser: service('session-user'),
	currentUser: Ember.computed.alias('sessionUser.currentUser'),
    ideaIdForVotes: function(){
        console.log('---------ideaIdForVotes');
        var self = this;
        var userVotes = self.get('currentUser.votes');
        var array=[];
        userVotes.forEach(function(vote, index, enumerable) {
            var tempIdea = vote.get('idea.id');
            array.push(tempIdea);
        });

        console.log(array);
        return array;

    }.property('currentUser.votes.[]'),
    // votedOnIdeas: Ember.computed.map('currentUser.votes', function(vote, index) {
    //     return vote.get('idea');
    //   }),
    votedOnIdeas: Ember.computed.mapBy('currentUser.votes','idea'),
    ideasInCommon: Ember.computed.intersect('votedOnIdeas', 'model'),
  	sortedIdeas:function(){

  		var self = this;
  		var ideas = self.get('model');
  		var currentUserVotes = self.get('currentUser.votes');
  		var what = self.get('currentUser.votes.idea');
        // console.log(what);
        // console.log(Ember.inspect(what));
        var votedOnIdeas = self.get('votedOnIdeas');
        console.log('votedOnIdeas',votedOnIdeas);
        
        var model = self.get('model');
        console.log('model',model);

        var ideasInCommon = self.get('ideasInCommon');
        console.log('ideasInCommon',ideasInCommon);


  		ideas.forEach(function(idea1) {
			   	var ideaId1 = idea1.get('id');
			   	// console.log(ideaId1);
	   	  		currentUserVotes.forEach(function(vote) {
   				    let ideaId2 = vote.get('idea.id');
		   			// console.log("---",ideaId2);
   				   	
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
			var votedAlready;

			votes.forEach(function(vote) {
			    let idea = vote.get('idea');
			    let otherIdeaId = idea.get('id');

			    if(otherIdeaId === ideaId){
			    	console.log('FOUND IT SAME IDEAID');
			    	foundIdea = idea;
			    	votedAlready=vote;
			    }
			});

			if(!foundIdea){

				var idea = this.store.peekRecord('idea', ideaId);
				let ideaCount = idea.get('count');
				idea.set('count',ideaCount+1);

				var newVote = self.store.createRecord('vote', {
					user: currentUser,
					idea: idea,
				});

				newVote.save();
			} else {
				console.log('votedAlready',votedAlready);
				votedAlready.destroyRecord();
				let ideaCount = foundIdea.get('count');
				foundIdea.set('count',ideaCount-1);

				// store.findRecord('post', 2).then(function(post) {
				//   post.destroyRecord(); // => DELETE to /posts/2
				// });
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
