import Ember from 'ember';

export default Ember.Component.extend({
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
        }
    }
});
