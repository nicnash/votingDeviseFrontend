import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: 'http://votingbackend.herokuapp.com/users/sign_in'
});