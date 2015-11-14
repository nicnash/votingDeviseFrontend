import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
sessionUser: service('session-user'),
currentUser: Ember.computed.alias('sessionUser.currentUser'),
    isUsersIdea: function(){
        var self = this;
        var isAuthenticated = self.get('isAuthenticated')
        if(isAuthenticated){
            var idea = self.get('idea');
            var currentUserIdeas = self.get('currentUser.ideas');

            return currentUserIdeas.contains(idea);
        } else {
            return false;
        }
    }.property('idea'),
    isVotedOn:function(){
        console.log('------isVotedOn');
        var self = this;
        var isAuthenticated = self.get('isAuthenticated')
        if(isAuthenticated){
            var ideaIdForVotes = self.get('ideaIdForVotes');
            var ideaId = self.get('idea.id');

            return ideaIdForVotes.contains(ideaId);
        }
        else {
            return false;
        }
    }.property('ideaIdForVotes'),
    actions:{
        vote:function(ideaId){
            var self = this;
            var isAuthenticated = self.get('isAuthenticated');
            var isConfirmed = self.get('isConfirmed');

            if(isAuthenticated){
                if(isConfirmed){
                    self.sendAction('vote',ideaId);
                } else {
                    self.sendAction('presentConfirmationModal');
                }

            } else {
                self.sendAction('presentLoginModal');
            }
        },
        deleteIdea:function(idea){
            //do i need to check if i own this =x
            idea.destroyRecord();
        }
    }
});
