import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
sessionUser: service('session-user'),
currentUser: Ember.computed.alias('sessionUser.currentUser'),
    isUsersIdea: function(){
        var self = this;
        var idea = self.get('idea');
        var currentUserIdeas = self.get('currentUser.ideas');

        return currentUserIdeas.contains(idea);
    }.property('idea'),
    isVotedOn:function(){
        console.log('------isVotedOn');
        var self = this;
        var ideaIdForVotes = self.get('ideaIdForVotes');
        var ideaId = self.get('idea.id');
        return ideaIdForVotes.contains(ideaId);
    }.property('ideaIdForVotes'),
    actions:{
        vote:function(ideaId){
            this.sendAction('vote',ideaId);
        },
        deleteIdea:function(idea){
            //do i need to check if i own this =x
            idea.destroyRecord();
        }
    }
});
