import Ember from 'ember';

export default Ember.Controller.extend({
	isEditing: false,
	title: function() {
        return this.get('model').get('title');
    }.property('model.title'),
   	body: function() {
        return this.get('model').get('body');
    }.property('model.body'),
	actions: {
		titleChanged: function(newValue) {
			this.set('title', newValue);
		},
		bodyChanged: function(newValue) {
			this.set('body', newValue);
		},
		edit: function() {
			this.set('isEditing', true);
		},
		save: function(newTitle, newBody) {
			this.set('isEditing', false);
			this.store.push('website-help', {
				id: 1,
				title: newTitle,
				body: newBody
			}).save();
		}
	}
});
