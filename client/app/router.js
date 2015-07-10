import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});



Router.map(function() {
  this.route('main-pages', { path: '//' }, function() {
    this.route('contact');
    this.route('register');
    this.route('verify-loc');
    this.route('myumocss');
    this.route('ocrm');
  });

  this.route('the-center', { path: '///' }, function() {
    this.route('the-staff');
    this.route('printing');
    this.route('lockers');
    this.route('whats-happening');
  });

  this.route('move-in-out', { path: '////' }, function() {
    this.route('moving-in');
    this.route('housemate-agreement');
    this.route('renters-insurance');
    this.route('security-deposit');
    this.route('turning-on-utils');
    this.route('what-to-pack');
    this.route('comcast-amherst');
    this.route('storage-companies');
  });

  this.route('living-off-campus', { path: '/////' }, function() {
    this.route('town-bylaws');
    this.route('emergency-prep');
    this.route('fire-safety');
    this.route('personal-safety');
    this.route('insurance');
    this.route('winter-readiness');
    this.route('go-green');
    this.route('prep-for-breaks');
  });

  this.route('faq', { path: '//////' }, function() {
    this.route('student-tenant');
    this.route('landlord');
    this.route('website-help');
    this.route('international-students');
  });

  this.route('resources',{ path: '///////' }, function() {
    this.route('moving');
    this.route('money');
    this.route('safety');
    this.route('more');
  });

  this.route('rentals',{ path: '////////' }, function() {
    this.route('search-rentals');
    this.route('submit-rental');
    this.route('edit-rental');
    this.route('aptcomplexes');
    this.route('family-housing');
  });

  this.route('housemates', { path: '/////////' }, function() {
    this.route('search-profiles');
    this.route('submit-profile');
    this.route('edit-profile');
    this.route('household-rules');
    this.route('talking-about-money');
    this.route('resolving-conflicts');
    this.route('getting-to-know');
    this.route('communicating');
    this.route('living-with-housemates');
    this.route('managing-money');
  });

  this.route('footer', { path: '//////////' }, function() {
    this.route('service-expectations');
    this.route('recent-scammers');
    this.route('ocss-student-jobs');
  });

  this.route('my-umocss', function() {
    this.route('home');
  });
});

export default Router;
