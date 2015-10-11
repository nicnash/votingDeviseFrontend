// import DS from 'ember-data';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

// export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
//   authorizer: 'authorizer:devise'
// });


import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise'
});