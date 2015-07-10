import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  primaryEmail: DS.attr('string'),
  password: DS.attr('string'),
  isAdmin: DS.attr('boolean', {defaultValue: false}),

});
