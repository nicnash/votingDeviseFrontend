import Devise from 'ember-simple-auth/authenticators/devise';
import config from '../config/environment';

export default Devise.extend({
  // serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
  serverTokenEndpoint: config.api.host + '/users/sign_in'
});