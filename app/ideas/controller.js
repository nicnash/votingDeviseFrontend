import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
		vote:function(ideaId){
			var idea = this.store.peekRecord('idea', ideaId);
			console.log('idea',idea);
			var ideaCount = idea.count;
			// idea.set("count", ideaCount+1);


			var store = this.store;

			store.createRecord('vote', {
			  user: 1,
			  idea: idea,
			});

			// idea.save();
		}
	}
});
