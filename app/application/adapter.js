import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { ActiveModelAdapter } from 'active-model-adapter';
import config from '../config/environment';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',
  host: config.api.host,
});