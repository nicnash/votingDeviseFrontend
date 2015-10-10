import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  actions: {
    authenticate: function() {
      var data = this.getProperties('email', 'password');
      return this.get('session').authenticate('authenticator:devise', data).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
    // authenticate: function() {
    //   var data = this.getProperties('email', 'password');
    //   console.log(data);
      
    //   return this.get('session').authenticate('authenticator:devise', data).catch((reason) => {
    //     this.set('errorMessage', reason.error);
    //   });
    // }
  }
});