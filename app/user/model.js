import DS from 'ember-data';

export default DS.Model.extend({
	email:  DS.attr('string'),
	ideas:  DS.hasMany('idea'),
	votes:  DS.hasMany('vote'),
	ideasCount: Ember.computed.alias('ideas.length')
});
