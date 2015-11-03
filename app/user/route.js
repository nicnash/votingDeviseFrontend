import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	// model:function() {
	//   	var self = this;
	//     var user = this.store.findRecord('user', 1);
	//     console.log('user',user);

	//     return user;
	// }
});
