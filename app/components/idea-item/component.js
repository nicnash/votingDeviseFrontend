import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        vote:function(ideaId){
            this.sendAction('vote',ideaId);
        }
    }
});
