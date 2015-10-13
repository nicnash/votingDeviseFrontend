import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
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
			var idea = this.store.findRecord('idea', ideaId).then(function(idea) {
				  var count = idea.get('count'); // => "Rails is Omakase"
				   idea.set('count', count+1);
				  // idea.save(); // => PUT to '/idea/1'





				  var aUser = self.store.peekRecord('user',1);

				  var newVote = self.store.createRecord('vote', {
				    user: aUser,
				    idea: idea,
				  });
				  console.log('newVote',newVote);
				  newVote.save();

				  
				});

			
		},
		createIdea:function(){
			var self = this;

			console.log('-----createIdea');
			var idea = self.get('ideaInput');
			var aUser = self.store.peekRecord('user',1);
			var newIdea = self.store.createRecord('idea', {
			  title: idea,
			  description: idea+' 123 ' + idea,
			  count:0,
			  user:aUser
			});
			newIdea.save();

		}
	}
});
