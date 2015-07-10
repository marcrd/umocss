import Ember from 'ember';

export default Ember.Controller.extend({
	isLoggedIn: false,
  loginFailed: false,
  name: '',
  isAdmin: false,
  actions: {
  	login: function(entPrimEmail, entPW) {
      var me = this;
      if(!Ember.isEmpty(entPrimEmail) && !Ember.isEmpty(entPW)){
        return this.store.filter('application', { primaryEmail: entPrimEmail }, function(application) {
          var password = application.get('password');
          var name = application.get('name');
          var admin = application.get('isAdmin');
          if (password === entPW){
            me.set('isLoggedIn', true);
            me.set('name', name);
            me.set('isAdmin', admin);
          }
          else{
            me.set('loginFailed', true);
          }
        });
      }
    },
    logout: function() {
      this.set('isLoggedIn', false);
      this.set('loginFailed', false);
      this.set('isProcessing', false);
      this.set('name', '');
      this.set('primaryEmail', '');
      this.set('password', '');
      location.reload();
    }
  }
});
