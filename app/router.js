import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {});
  this.route('dashboard', {});
  this.route('ideas', {});
  this.route('user', {});
  this.route('votes', {});
  this.route('users', {});
});

export default Router;
