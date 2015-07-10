import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
		createUser(primaryEmail, password) {
			this.store.createRecord('contact', {
				primaryEmail: primaryEmail
			}).save();
		}
	}

});
