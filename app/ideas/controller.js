import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
    classNames:['ideas'],
    session: service('session'),
	sessionUser: service('session-user'),
	currentUser: Ember.computed.alias('model.currentUser'),
	isAuthenticated: Ember.computed.alias('session.isAuthenticated'),
	loginModalVisible:false,
    ideaIdForVotes: function(){
        console.log('---------ideaIdForVotes');
        var self = this;
        var isAuthenticated = self.get('isAuthenticated');
        if(isAuthenticated){
	        var userVotes = self.get('currentUser.votes');
	        var array=[];
	        userVotes.forEach(function(vote, index, enumerable) {
	            var tempIdea = vote.get('idea.id');
	            array.push(tempIdea);
	        });

	        console.log(array);
	        return array;
    	} else {
    		return null
    	}


    }.property('currentUser.votes.[]'),
    votedOnIdeas: Ember.computed.mapBy('currentUser.votes','idea'),
    ideasInCommon: Ember.computed.intersect('votedOnIdeas', 'model.ideas'),
    isMaxIdeas: Ember.computed.gte('currentUser.ideasCount', 3),
  	sortedIdeas:function(){

  		var self = this;
  		var ideas = self.get('model.ideas');
  		var currentUser = self.get('currentUser.email');
  		var currentUserVotes = self.get('currentUser.votes');
  		var what = self.get('currentUser.votes.idea');
        var votedOnIdeas = self.get('votedOnIdeas');
        var isAuthenticated = self.get('isAuthenticated');
        console.log('currentUser',currentUser);
        console.log('votedOnIdeas',votedOnIdeas);
        
        var model = self.get('model.ideas');
        console.log('model',model);


        if(isAuthenticated){
	        var ideasInCommon = self.get('ideasInCommon');
	        console.log('ideasInCommon',ideasInCommon);

	  		ideas.forEach(function(idea1) {
				   	var ideaId1 = idea1.get('id');
		   	  		currentUserVotes.forEach(function(vote) {
	   				    let ideaId2 = vote.get('idea.id');
	   				   	
	   				   	if(ideaId1 === ideaId2){
	   				   		console.log('yep!');

	   				   	}
	   				});

				});

	  		return ideas.sortBy('count').reverse();
  		} else {
  			return ideas.sortBy('count').reverse();
  		}

  	}.property('model.ideas.@each.count'),

	actions:{
		presentLoginModal:function(){
            console.log('ideas controller  You Must Authenticate first before you can vote');

			this.set('loginModalVisible',true);
		},
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
			}

		},
		createIdea:function(){
			console.log('-----createIdea');
			var self = this;
			var currentUser = self.get('currentUser');
			var ideasCount = currentUser.get('ideasCount');
			console.log('total ideas:', ideasCount);

			if(ideasCount <=2){
				var ideaTitle = self.get('ideaTitle');
				var ideaDescription = self.get('ideaDescription');

				var newIdea = self.store.createRecord('idea', {
				  title: ideaTitle,
				  description: ideaDescription,
				  count:0,
				  user:currentUser
				});
				self.set('ideaTitle','');
				self.set('ideaDescription','');


				newIdea.save();
			} else {
				console.log('ERRRR BAD.');
			}

		}
	}
});
