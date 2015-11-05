import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
    session: service('session'),
 	sessionUser: service('session-user'),

    actions:{
        logout() {
        	console.log('session',this.get('session'));
            this.get('session').invalidate();
            return false;
        }
    }
});


