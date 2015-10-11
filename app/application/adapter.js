import DS from 'ember-data';

// export default DS.RESTAdapter.extend({
// });

export default DS.JSONAPIAdapter.extend({
    handleResponse: function(status, headers, payload) {

        // Fix payload if not present
        if (typeof payload === 'undefined') {
            payload = {};
        }

        // If we have an error
        if (String(status).charAt(0) === '4' || String(status).charAt(0) === '5') {

            // Push error in payload if not exists
            if (!payload.hasOwnProperty('errors')) {
                payload = {}; // Clear payload
                payload.errors = []; // Set empty array
            }

        }

        // Everything seems fine, continue
        return this._super(status, headers, payload);
    }
});

