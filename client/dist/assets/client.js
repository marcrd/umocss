/* jshint ignore:start */

/* jshint ignore:end */

define('client/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'client/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('client/blueprints/ember-ckeditor', ['exports', 'ember-ckeditor/blueprints/ember-ckeditor'], function (exports, ember_ckeditor) {

	'use strict';



	exports.default = ember_ckeditor.default;

});
define('client/components/ember-ckeditor', ['exports', 'ember-ckeditor/components/ember-ckeditor'], function (exports, ember_ckeditor) {

	'use strict';



	exports.default = ember_ckeditor.default;

});
define('client/components/summer-note', ['exports', 'ember-cli-summernote/components/summer-note'], function (exports, SummerNoteComponent) {

	'use strict';

	/*
		This is just a proxy file requiring the component from the /addon folder and
		making it available to the dummy application!
	 */
	exports['default'] = SummerNoteComponent['default'];

});
define('client/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    isLoggedIn: false,
    loginFailed: false,
    name: '',
    isAdmin: false,
    actions: {
      login: function login(entPrimEmail, entPW) {
        var me = this;
        if (!Ember['default'].isEmpty(entPrimEmail) && !Ember['default'].isEmpty(entPW)) {
          return this.store.filter('application', { primaryEmail: entPrimEmail }, function (application) {
            var password = application.get('password');
            var name = application.get('name');
            var admin = application.get('isAdmin');
            if (password === entPW) {
              me.set('isLoggedIn', true);
              me.set('name', name);
              me.set('isAdmin', admin);
            } else {
              me.set('loginFailed', true);
            }
          });
        }
      },
      logout: function logout() {
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

});
define('client/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/controllers/faq/website-help', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		isEditing: false,
		title: (function () {
			return this.get('model').get('title');
		}).property('model.title'),
		body: (function () {
			return this.get('model').get('body');
		}).property('model.body'),
		actions: {
			titleChanged: function titleChanged(newValue) {
				this.set('title', newValue);
			},
			bodyChanged: function bodyChanged(newValue) {
				this.set('body', newValue);
			},
			edit: function edit() {
				this.set('isEditing', true);
			},
			save: function save(newTitle, newBody) {
				this.set('isEditing', false);
				this.store.push('website-help', {
					id: 1,
					title: newTitle,
					body: newBody
				}).save();
			}
		}
	});

});
define('client/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/initializers/app-version', ['exports', 'client/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('client/initializers/ember-cli-mirage', ['exports', 'client/config/environment', 'client/mirage/config', 'ember-cli-mirage/server', 'ember-cli-mirage/utils/read-fixtures', 'ember-cli-mirage/utils/read-factories'], function (exports, ENV, userConfig, Server, readFixtures, readFactories) {

  'use strict';

  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(container, application) {
      var env = ENV['default'].environment;

      if (_shouldUseMirage(env, ENV['default']['ember-cli-mirage'])) {
        var factoryMap = readFactories['default'](ENV['default'].modulePrefix);
        var fixtures = readFixtures['default'](ENV['default'].modulePrefix);
        var server = new Server['default']({
          environment: env
        });

        server.loadConfig(userConfig['default']);

        if (env === 'test' && factoryMap) {
          server.loadFactories(factoryMap);
        } else {
          server.db.loadData(fixtures);
        }
      }
    }
  };

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  };

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }

});
define('client/initializers/export-application-global', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('client/initializers/simple-auth-oauth2', ['exports', 'simple-auth-oauth2/configuration', 'simple-auth-oauth2/authenticators/oauth2', 'simple-auth-oauth2/authorizers/oauth2', 'client/config/environment'], function (exports, Configuration, Authenticator, Authorizer, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth-oauth2',
    before: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth-oauth2'] || {});
      container.register('simple-auth-authorizer:oauth2-bearer', Authorizer['default']);
      container.register('simple-auth-authenticator:oauth2-password-grant', Authenticator['default']);
    }
  };

});
define('client/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'client/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth'] || {});
      setup['default'](container, application);
    }
  };

});
define('client/mirage/config', ['exports'], function (exports) {

  'use strict';

  exports['default'] = function () {

    this.get('/contacts');

    this.get('/websiteHelps/:id');
    this.put('/websiteHelps/:id');

    this.get('/applications');
    this.post('/applications');
    // These comments are here to help you get started. Feel free to delete them.

    /*
      Default config
    */
    // this.namespace = '';    // make this `api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Route shorthand cheatsheet
    */
    /*
      GET shorthands
       // Collections
      this.get('/contacts');
      this.get('/contacts', 'users');
      this.get('/contacts', ['contacts', 'addresses']);
       // Single objects
      this.get('/contacts/:id');
      this.get('/contacts/:id', 'user');
      this.get('/contacts/:id', ['contact', 'addresses']);
    */

    /*
      POST shorthands
       this.post('/contacts');
      this.post('/contacts', 'user'); // specify the type of resource to be created
    */

    /*
      PUT shorthands
       this.put('/contacts/:id');
      this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
    */

    /*
      DELETE shorthands
       this.del('/contacts/:id');
      this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted
       // Single object + related resources. Make sure parent resource is first.
      this.del('/contacts/:id', ['contact', 'addresses']);
    */

    /*
      Function fallback. Manipulate data in the db via
         - db.{collection} // returns all the data defined in /app/mirage/fixtures/{collection}.js
        - db.{collection}.find(id)
        - db.{collection}.where(query)
        - db.{collection}.update(target, attrs)
        - db.{collection}.remove(target)
       // Example: return a single object with related models
      this.get('/contacts/:id', function(db, request) {
        var contactId = +request.params.id;
        var contact = db.contacts.find(contactId);
        var addresses = db.addresses
          .filterBy('contact_id', contactId);
         return {
          contact: contact,
          addresses: addresses
        };
      });
     */
  }

});
define('client/mirage/factories/contact', ['exports', 'ember-cli-mirage'], function (exports, Mirage) {

  'use strict';

  /*
    This is an example factory definition. Factories are
    used inside acceptance tests.

    Create more files in this directory to define additional factories.
  */
  exports['default'] = Mirage['default'].Factory.extend({
    name: 'Pete',
    age: 20,

    email: function email(i) {
      return 'person' + i + '@test.com';
    },

    admin: function admin() {
      return this.age > 30;
    }
  });

});
define('client/mirage/fixtures/applications', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    name: 'Bill Nye',
    primaryEmail: 'bnye@scienceguy.edu',
    password: 'science',
    isAdmin: false }, {
    name: 'Clark Cone',
    primaryEmail: 'ccone@umass.edu',
    password: 'test',
    isAdmin: true }];

});
define('client/mirage/fixtures/contacts', ['exports'], function (exports) {

  'use strict';

  /*
    This is an example. This data will be added to the db
    under the `contacts` key.

    Create more files in this directory to add more data.
  */
  exports['default'] = [{
    id: 1,
    primaryEmail: 'zelda@hyrule.net'
  }, {
    id: 2,
    primaryEmail: 'link@hyrule.net'
  }];

});
define('client/mirage/fixtures/websiteHelps', ['exports'], function (exports) {

  'use strict';

  exports['default'] = [{
    id: 1,
    title: "Website Help",
    body: "Hi there. This is a test post. TEST TEST TEST TEST"
  }];

});
define('client/models/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    primaryEmail: DS['default'].attr('string'),
    password: DS['default'].attr('string'),
    isAdmin: DS['default'].attr('boolean', { defaultValue: false }) });

});
define('client/models/contact', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({

		primaryEmail: DS['default'].attr('string')

	});

});
define('client/models/register', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({

		primaryEmail: DS['default'].attr('string')

	});

});
define('client/models/website-help', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    body: DS['default'].attr('string')
  });

});
define('client/router', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('main-pages', { path: '//' }, function () {
      this.route('contact');
      this.route('register');
      this.route('verify-loc');
      this.route('myumocss');
      this.route('ocrm');
    });

    this.route('the-center', { path: '///' }, function () {
      this.route('the-staff');
      this.route('printing');
      this.route('lockers');
      this.route('whats-happening');
    });

    this.route('move-in-out', { path: '////' }, function () {
      this.route('moving-in');
      this.route('housemate-agreement');
      this.route('renters-insurance');
      this.route('security-deposit');
      this.route('turning-on-utils');
      this.route('what-to-pack');
      this.route('comcast-amherst');
      this.route('storage-companies');
    });

    this.route('living-off-campus', { path: '/////' }, function () {
      this.route('town-bylaws');
      this.route('emergency-prep');
      this.route('fire-safety');
      this.route('personal-safety');
      this.route('insurance');
      this.route('winter-readiness');
      this.route('go-green');
      this.route('prep-for-breaks');
    });

    this.route('faq', { path: '//////' }, function () {
      this.route('student-tenant');
      this.route('landlord');
      this.route('website-help');
      this.route('international-students');
    });

    this.route('resources', { path: '///////' }, function () {
      this.route('moving');
      this.route('money');
      this.route('safety');
      this.route('more');
    });

    this.route('rentals', { path: '////////' }, function () {
      this.route('search-rentals');
      this.route('submit-rental');
      this.route('edit-rental');
      this.route('aptcomplexes');
      this.route('family-housing');
    });

    this.route('housemates', { path: '/////////' }, function () {
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

    this.route('footer', { path: '//////////' }, function () {
      this.route('service-expectations');
      this.route('recent-scammers');
      this.route('ocss-student-jobs');
    });

    this.route('my-umocss', function () {
      this.route('home');
    });
  });

  exports['default'] = Router;

});
define('client/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.find('application');
		}
	});

});
define('client/routes/faq/international-students', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/faq/landlord', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/faq/student-tenant', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/faq/website-help', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.find('website-help', 1);
		}
	});

});
define('client/routes/footer/ocss-student-jobs', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/footer/recent-scammers', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/footer/service-expectations', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/communicating', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/edit-profile', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/getting-to-know', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/household-rules', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/living-with-housemates', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/managing-money', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/resolving-conflicts', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/search-profiles', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/submit-profile', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/housemates/talking-about-money', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/emergency-prep', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/fire-safety', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/go-green', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/insurance', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/personal-safety', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/prep-for-breaks', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/town-bylaws', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/living-off-campus/winter-readiness', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/main-pages/contact', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/main-pages/ocrm', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/main-pages/register', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({

		actions: {
			createUser: function createUser(primaryEmail, password) {
				this.store.createRecord('contact', {
					primaryEmail: primaryEmail
				}).save();
			}
		}

	});

});
define('client/routes/main-pages/verify-loc', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/comcast-amherst', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/housemate-agreement', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/moving-in', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/renters-insurance', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/security-deposit', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/storage-companies', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/turning-on-utils', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/move-in-out/what-to-pack', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/my-umocss/home', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/rentals/aptcomplexes', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/rentals/edit-rental', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/rentals/family-housing', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/rentals/search-rentals', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/rentals/submit-rental', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/resources/money', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/resources/more', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/resources/moving', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/resources/safety', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/the-center/lockers', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/the-center/printing', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/the-center/the-staff', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/routes/the-center/whats-happening', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('client/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, inline = hooks.inline;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            inline(env, morph0, context, "link-to", ["OCRM", "main-pages.ocrm"], {});
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","dropdown");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          dom.setAttribute(el2,"class","dropdown-toggle");
          dom.setAttribute(el2,"data-toggle","dropdown");
          dom.setAttribute(el2,"title","Important Resources");
          var el3 = dom.createTextNode("Welcome back, ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2,"class","dropdown-menu");
          var el3 = dom.createTextNode("\n                        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("                        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          var el4 = dom.createElement("a");
          dom.setAttribute(el4,"href","#");
          var el5 = dom.createTextNode("Logout");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content, inline = hooks.inline, get = hooks.get, block = hooks.block, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [3]);
          var element5 = dom.childAt(element4, [5, 0]);
          var morph0 = dom.createMorphAt(dom.childAt(element3, [1]),1,1);
          var morph1 = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          var morph2 = dom.createMorphAt(element4,3,3);
          content(env, morph0, context, "name");
          inline(env, morph1, context, "link-to", ["My UMOCSS", "my-umocss.home"], {});
          block(env, morph2, context, "if", [get(env, context, "isAdmin")], {}, child0, null);
          element(env, element5, context, "action", ["logout"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.12.0",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","alert alert-danger");
            var el2 = dom.createTextNode("Invalid email or password.");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","dropdown");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          dom.setAttribute(el2,"class","dropdown-toggle");
          dom.setAttribute(el2,"data-toggle","dropdown");
          dom.setAttribute(el2,"title","Important Resources");
          var el3 = dom.createTextNode("Register or Sign In");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2,"class","dropdown-menu");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("                        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("form");
          var el4 = dom.createTextNode("\n                          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4,"class","form-group");
          var el5 = dom.createTextNode("\n                            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("label");
          dom.setAttribute(el5,"for","email");
          var el6 = dom.createTextNode("Email");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4,"class","form-group");
          var el5 = dom.createTextNode("\n                            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("label");
          dom.setAttribute(el5,"for","Password");
          var el6 = dom.createTextNode("Password");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                              ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4,"href","");
          dom.setAttribute(el4,"class","btn btn-success");
          var el5 = dom.createTextNode("Sign In");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4,"href","/register");
          dom.setAttribute(el4,"class","btn btn-danger");
          dom.setAttribute(el4,"role","button");
          var el5 = dom.createTextNode("Register");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("                        \n                        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block, inline = hooks.inline, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1, 3]);
          var element1 = dom.childAt(element0, [3]);
          var element2 = dom.childAt(element1, [5]);
          var morph0 = dom.createMorphAt(element0,1,1);
          var morph1 = dom.createMorphAt(dom.childAt(element1, [1]),3,3);
          var morph2 = dom.createMorphAt(dom.childAt(element1, [3]),3,3);
          block(env, morph0, context, "if", [get(env, context, "loginFailed")], {}, child0, null);
          inline(env, morph1, context, "input", [], {"id": "primaryEmail", "class": "form-control", "value": get(env, context, "primaryEmail")});
          inline(env, morph2, context, "input", [], {"id": "password", "class": "form-control", "type": "password", "value": get(env, context, "password")});
          element(env, element2, context, "action", ["login", get(env, context, "primaryEmail"), get(env, context, "password")], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("html");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("head");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("script");
        dom.setAttribute(el3,"src","assets/flickity.pkgd.min.js");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("script");
        dom.setAttribute(el3,"src","assets/html5.min.js");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("link");
        dom.setAttribute(el3,"rel","stylesheet");
        dom.setAttribute(el3,"type","text/css");
        dom.setAttribute(el3,"href","assets/flickity.css");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("body");
        var el3 = dom.createTextNode("\n\n\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","banner_top");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4,"class","navbar navbar-default");
        dom.setAttribute(el4,"role","navigation");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","navbar-collapse collapse");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","nav navbar-nav navbar-left");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","navbar-left");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","http://www.umass.com");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"id","umass_text");
        dom.setAttribute(el9,"src","assets/images/umass_white.png");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","nav navbar-nav navbar-right");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","navbar-right");
        var el8 = dom.createElement("button");
        dom.setAttribute(el8,"type","submit");
        dom.setAttribute(el8,"class","btn-search");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"id","personalBannerSearchLogo");
        dom.setAttribute(el9,"src","assets/images/search.png");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","navbar-right");
        var el8 = dom.createElement("input");
        dom.setAttribute(el8,"type","text");
        dom.setAttribute(el8,"class","form-control");
        dom.setAttribute(el8,"placeholder","Search...");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","banner_text");
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4,"class","navbar navbar-default");
        dom.setAttribute(el4,"role","navigation");
        var el5 = dom.createTextNode("\n       ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5,"class","navbar navbar-nav navbar-left");
        dom.setAttribute(el5,"role","navigation");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        var el7 = dom.createElement("span");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","/");
        dom.setAttribute(el8,"style","text-decoration:none;color:#881c1c;");
        var el9 = dom.createElement("b");
        var el10 = dom.createTextNode(" Off Campus Student Services ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n       ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n     \n\n \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navigation");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4,"class","navbar navbar-default");
        dom.setAttribute(el4,"role","navigation");
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","navbar-collapse");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","nav navbar-nav navbar-left");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","divider-vertical");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n           \n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Off Campus Student Center");
        var el9 = dom.createTextNode("The Center");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","FAQs");
        var el9 = dom.createTextNode("FAQ's");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("            \n\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Find out about living off campus");
        var el9 = dom.createTextNode("Move in/out");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu multi-column columns-2");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","row");
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n\n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Find out about living off campus");
        var el9 = dom.createTextNode("Living Off Campus");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu multi-column columns-2");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","row");
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","FAQs");
        var el9 = dom.createTextNode("FAQ's");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                    ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu");
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                      ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n            \n            \n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Important Resources");
        var el9 = dom.createTextNode("Resources");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Rental listings");
        var el9 = dom.createTextNode("Rentals");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu");
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createComment("");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n                ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","dropdown");
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","#");
        dom.setAttribute(el8,"class","dropdown-toggle");
        dom.setAttribute(el8,"data-toggle","dropdown");
        dom.setAttribute(el8,"title","Housemates/Tenants");
        var el9 = dom.createTextNode("Housemates/Tenants");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n                  ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","dropdown-menu multi-column columns-2");
        var el9 = dom.createTextNode("\n                    ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9,"class","row");
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                      ");
        dom.appendChild(el9, el10);
        var el10 = dom.createElement("div");
        dom.setAttribute(el10,"class","col-sm-6");
        var el11 = dom.createTextNode("\n                        ");
        dom.appendChild(el10, el11);
        var el11 = dom.createElement("ul");
        dom.setAttribute(el11,"class","multi-column-dropdown");
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                          ");
        dom.appendChild(el11, el12);
        var el12 = dom.createElement("li");
        var el13 = dom.createComment("");
        dom.appendChild(el12, el13);
        dom.appendChild(el11, el12);
        var el12 = dom.createTextNode("\n                        ");
        dom.appendChild(el11, el12);
        dom.appendChild(el10, el11);
        var el11 = dom.createTextNode("\n                      ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        var el10 = dom.createTextNode("\n                    ");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                  ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n\n\n\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","last");
        dom.setAttribute(el7,"title","Contact Us");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("            \n\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","nav navbar-nav navbar-right");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n      \n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","slideshow");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","gallery js-flickity");
        dom.setAttribute(el4,"data-flickity-options","{\"autoPlay\": 4000, \"pageDots\": false}");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","gallery-cell");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","assets/images/skycraper_example.jpeg");
        dom.setAttribute(el6,"alt","");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","gallery-cell");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","assets/images/street_example.jpeg");
        dom.setAttribute(el6,"alt","");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","gallery-cell");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","assets/images/shack_example.jpg");
        dom.setAttribute(el6,"alt","");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","gallery-cell");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","assets/images/interior.jpeg");
        dom.setAttribute(el6,"alt","");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","gallery-cell");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","assets/images/beach_example.jpg");
        dom.setAttribute(el6,"alt","");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("       {{#each contact in model}}\n        <p>{{contact.primaryEmail}}</p>\n      {{/each}} ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" footer ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","footer");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","footerWrapper");
        var el5 = dom.createTextNode("\n        \n        \n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","column");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","footerHeader");
        var el7 = dom.createTextNode("Help:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","footerSocialMedia");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n       ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n       ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","column");
        var el6 = dom.createTextNode("\n       ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","footerHeader");
        var el7 = dom.createTextNode("More:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n         ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","footerSocialMedia");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","http://www.umass.edu");
        var el9 = dom.createTextNode("UMass Amherst");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","http://www.housing.umass.edu");
        var el9 = dom.createTextNode("Residential Life");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","http://www.umass.edu/dean_students");
        var el9 = dom.createTextNode("Dean of Students");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","http://www.umass.edu/ccc");
        var el9 = dom.createTextNode("CCC");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","https://moodle.umass.edu/");
        var el9 = dom.createTextNode("Moodle");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n       ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n\n       ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","column");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6,"class","footerHeader");
        var el7 = dom.createTextNode("Follow Us On:");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","footerList");
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","https://www.facebook.com/offcampuslifeatumassamherst");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"src","assets/images/facebook.png");
        dom.setAttribute(el9,"style","width:40px; height:40px");
        dom.setAttribute(el9,"alt","Facebook");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","https://instagram.com/umassocsc/");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"src","assets/images/instagram.png");
        dom.setAttribute(el9,"style","width:40px; height:40px");
        dom.setAttribute(el9,"alt","Instagram");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","https://twitter.com/umocss");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"src","assets/images/twitter.png");
        dom.setAttribute(el9,"style","width:40px; height:40px");
        dom.setAttribute(el9,"alt","Twitter");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","https://www.youtube.com/user/UMassOffCampus");
        var el9 = dom.createElement("img");
        dom.setAttribute(el9,"src","assets/images/youtube.png");
        dom.setAttribute(el9,"style","width:40px; height:40px");
        dom.setAttribute(el9,"alt","YouTube");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, inline = hooks.inline, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element6 = dom.childAt(fragment, [1, 3]);
        var element7 = dom.childAt(element6, [5, 1, 1]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element8, [3, 3]);
        var element10 = dom.childAt(element8, [5, 3]);
        var element11 = dom.childAt(element8, [7, 3, 1]);
        var element12 = dom.childAt(element11, [1, 1]);
        var element13 = dom.childAt(element11, [3, 1]);
        var element14 = dom.childAt(element8, [9, 3, 1]);
        var element15 = dom.childAt(element14, [1, 1]);
        var element16 = dom.childAt(element14, [3, 1]);
        var element17 = dom.childAt(element8, [11, 3]);
        var element18 = dom.childAt(element8, [13, 3]);
        var element19 = dom.childAt(element8, [15, 3]);
        var element20 = dom.childAt(element8, [17, 3, 1]);
        var element21 = dom.childAt(element20, [1, 1]);
        var element22 = dom.childAt(element20, [3, 1]);
        var element23 = dom.childAt(element6, [15, 1]);
        var element24 = dom.childAt(element23, [1, 3]);
        var morph0 = dom.createMorphAt(dom.childAt(element9, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element9, [3]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element9, [5]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element9, [7]),0,0);
        var morph4 = dom.createMorphAt(dom.childAt(element9, [9]),0,0);
        var morph5 = dom.createMorphAt(dom.childAt(element10, [1]),0,0);
        var morph6 = dom.createMorphAt(dom.childAt(element10, [3]),0,0);
        var morph7 = dom.createMorphAt(dom.childAt(element10, [5]),0,0);
        var morph8 = dom.createMorphAt(dom.childAt(element10, [7]),0,0);
        var morph9 = dom.createMorphAt(dom.childAt(element12, [1]),0,0);
        var morph10 = dom.createMorphAt(dom.childAt(element12, [3]),0,0);
        var morph11 = dom.createMorphAt(dom.childAt(element12, [5]),0,0);
        var morph12 = dom.createMorphAt(dom.childAt(element12, [7]),0,0);
        var morph13 = dom.createMorphAt(dom.childAt(element13, [1]),0,0);
        var morph14 = dom.createMorphAt(dom.childAt(element13, [3]),0,0);
        var morph15 = dom.createMorphAt(dom.childAt(element13, [5]),0,0);
        var morph16 = dom.createMorphAt(dom.childAt(element13, [7]),0,0);
        var morph17 = dom.createMorphAt(dom.childAt(element15, [1]),0,0);
        var morph18 = dom.createMorphAt(dom.childAt(element15, [3]),0,0);
        var morph19 = dom.createMorphAt(dom.childAt(element15, [5]),0,0);
        var morph20 = dom.createMorphAt(dom.childAt(element15, [7]),0,0);
        var morph21 = dom.createMorphAt(dom.childAt(element16, [1]),0,0);
        var morph22 = dom.createMorphAt(dom.childAt(element16, [3]),0,0);
        var morph23 = dom.createMorphAt(dom.childAt(element16, [5]),0,0);
        var morph24 = dom.createMorphAt(dom.childAt(element16, [7]),0,0);
        var morph25 = dom.createMorphAt(dom.childAt(element17, [1]),0,0);
        var morph26 = dom.createMorphAt(dom.childAt(element17, [3]),0,0);
        var morph27 = dom.createMorphAt(dom.childAt(element17, [5]),0,0);
        var morph28 = dom.createMorphAt(dom.childAt(element17, [7]),0,0);
        var morph29 = dom.createMorphAt(dom.childAt(element18, [1]),0,0);
        var morph30 = dom.createMorphAt(dom.childAt(element18, [3]),0,0);
        var morph31 = dom.createMorphAt(dom.childAt(element18, [5]),0,0);
        var morph32 = dom.createMorphAt(dom.childAt(element18, [7]),0,0);
        var morph33 = dom.createMorphAt(dom.childAt(element19, [1]),0,0);
        var morph34 = dom.createMorphAt(dom.childAt(element19, [3]),0,0);
        var morph35 = dom.createMorphAt(dom.childAt(element19, [5]),0,0);
        var morph36 = dom.createMorphAt(dom.childAt(element19, [7]),0,0);
        var morph37 = dom.createMorphAt(dom.childAt(element19, [9]),0,0);
        var morph38 = dom.createMorphAt(dom.childAt(element21, [1]),0,0);
        var morph39 = dom.createMorphAt(dom.childAt(element21, [3]),0,0);
        var morph40 = dom.createMorphAt(dom.childAt(element21, [5]),0,0);
        var morph41 = dom.createMorphAt(dom.childAt(element22, [1]),0,0);
        var morph42 = dom.createMorphAt(dom.childAt(element22, [3]),0,0);
        var morph43 = dom.createMorphAt(dom.childAt(element22, [5]),0,0);
        var morph44 = dom.createMorphAt(dom.childAt(element22, [7]),0,0);
        var morph45 = dom.createMorphAt(dom.childAt(element22, [9]),0,0);
        var morph46 = dom.createMorphAt(dom.childAt(element22, [11]),0,0);
        var morph47 = dom.createMorphAt(dom.childAt(element22, [13]),0,0);
        var morph48 = dom.createMorphAt(dom.childAt(element22, [15]),0,0);
        var morph49 = dom.createMorphAt(dom.childAt(element8, [19]),0,0);
        var morph50 = dom.createMorphAt(dom.childAt(element7, [3]),1,1);
        var morph51 = dom.createMorphAt(element6,11,11);
        var morph52 = dom.createMorphAt(dom.childAt(element24, [1]),0,0);
        var morph53 = dom.createMorphAt(dom.childAt(element24, [3]),0,0);
        var morph54 = dom.createMorphAt(dom.childAt(element24, [5]),0,0);
        var morph55 = dom.createMorphAt(dom.childAt(element24, [7]),0,0);
        var morph56 = dom.createMorphAt(dom.childAt(element23, [3, 3, 1]),0,0);
        inline(env, morph0, context, "link-to", ["The Staff", "the-center.the-staff"], {});
        inline(env, morph1, context, "link-to", ["Printing", "the-center.printing"], {});
        inline(env, morph2, context, "link-to", ["Lockers", "the-center.lockers"], {});
        inline(env, morph3, context, "link-to", ["See What's Happening at the Center", "the-center.whats-happening"], {});
        inline(env, morph4, context, "link-to", ["Employment", "footer.ocss-student-jobs"], {});
        inline(env, morph5, context, "link-to", ["Student/Tenant", "faq.student-tenant"], {});
        inline(env, morph6, context, "link-to", ["Landlords", "faq.landlord"], {});
        inline(env, morph7, context, "link-to", ["International Students", "faq.international-students"], {});
        inline(env, morph8, context, "link-to", ["Website Help", "faq.website-help"], {});
        inline(env, morph9, context, "link-to", ["Moving In", "move-in-out.moving-in"], {});
        inline(env, morph10, context, "link-to", ["Housemate Agreement", "move-in-out.housemate-agreement"], {});
        inline(env, morph11, context, "link-to", ["Renters Insurance", "move-in-out.renters-insurance"], {});
        inline(env, morph12, context, "link-to", ["Security Deposit", "move-in-out.security-deposit"], {});
        inline(env, morph13, context, "link-to", ["Turning on Utilities", "move-in-out.turning-on-utils"], {});
        inline(env, morph14, context, "link-to", ["What to Pack", "move-in-out.what-to-pack"], {});
        inline(env, morph15, context, "link-to", ["Comcast Cable in Amherst", "move-in-out.comcast-amherst"], {});
        inline(env, morph16, context, "link-to", ["Storage Companies", "move-in-out.storage-companies"], {});
        inline(env, morph17, context, "link-to", ["Town Bylaws and Student Conduct", "living-off-campus.town-bylaws"], {});
        inline(env, morph18, context, "link-to", ["Emergency Preparedness", "living-off-campus.emergency-prep"], {});
        inline(env, morph19, context, "link-to", ["Fire Safety", "living-off-campus.fire-safety"], {});
        inline(env, morph20, context, "link-to", ["Personal Safety", "living-off-campus.personal-safety"], {});
        inline(env, morph21, context, "link-to", ["Insurance", "living-off-campus.insurance"], {});
        inline(env, morph22, context, "link-to", ["Winter Readiness", "living-off-campus.winter-readiness"], {});
        inline(env, morph23, context, "link-to", ["Go Green and Save", "living-off-campus.go-green"], {});
        inline(env, morph24, context, "link-to", ["Preparing for Breaks", "living-off-campus.prep-for-breaks"], {});
        inline(env, morph25, context, "link-to", ["Student/Tenant", "faq.student-tenant"], {});
        inline(env, morph26, context, "link-to", ["Landlord", "faq.landlord"], {});
        inline(env, morph27, context, "link-to", ["International Students", "faq.international-students"], {});
        inline(env, morph28, context, "link-to", ["Website Help", "faq.website-help"], {});
        inline(env, morph29, context, "link-to", ["Moving", "resources.moving"], {});
        inline(env, morph30, context, "link-to", ["Money", "resources.money"], {});
        inline(env, morph31, context, "link-to", ["Safety", "resources.safety"], {});
        inline(env, morph32, context, "link-to", ["More", "resources.more"], {});
        inline(env, morph33, context, "link-to", ["Search Posted Listings", "rentals.search-rentals"], {});
        inline(env, morph34, context, "link-to", ["Submit New Rental", "rentals.submit-rental"], {});
        inline(env, morph35, context, "link-to", ["Edit Rental Listing(s)", "rentals.edit-rental"], {});
        inline(env, morph36, context, "link-to", ["Apartment Complexes", "rentals.aptcomplexes"], {});
        inline(env, morph37, context, "link-to", ["Family Housing", "rentals.family-housing"], {});
        inline(env, morph38, context, "link-to", ["Search Profiles", "housemates.search-profiles"], {});
        inline(env, morph39, context, "link-to", ["Submit a Profile", "housemates.submit-profile"], {});
        inline(env, morph40, context, "link-to", ["Edit Profile", "housemates.edit-profile"], {});
        inline(env, morph41, context, "link-to", ["Housemate Agreement", "move-in-out.housemate-agreement"], {});
        inline(env, morph42, context, "link-to", ["Establishing Household Rules", "housemates.household-rules"], {});
        inline(env, morph43, context, "link-to", ["Talking about Money", "housemates.talking-about-money"], {});
        inline(env, morph44, context, "link-to", ["Resolving Conflicts", "housemates.resolving-conflicts"], {});
        inline(env, morph45, context, "link-to", ["Getting to Know Them", "housemates.getting-to-know"], {});
        inline(env, morph46, context, "link-to", ["Communicating", "housemates.communicating"], {});
        inline(env, morph47, context, "link-to", ["Living with Housemates", "housemates.living-with-housemates"], {});
        inline(env, morph48, context, "link-to", ["Managing Money", "housemates.managing-money"], {});
        inline(env, morph49, context, "link-to", ["Contact Us", "main-pages.contact"], {});
        block(env, morph50, context, "if", [get(env, context, "isLoggedIn")], {}, child0, child1);
        content(env, morph51, context, "outlet");
        inline(env, morph52, context, "link-to", ["Service Expectations", "footer.service-expectations"], {});
        inline(env, morph53, context, "link-to", ["Recent Scammers", "footer.recent-scammers"], {});
        inline(env, morph54, context, "link-to", ["Website Help", "faq.website-help"], {});
        inline(env, morph55, context, "link-to", ["Contact Us", "main-pages.contact"], {});
        inline(env, morph56, context, "link-to", ["OCSS Student Jobs", "footer.ocss-student-jobs"], {});
        return fragment;
      }
    };
  }()));

});
define('client/templates/components/summer-note', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, null);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "textarea", [], {"classNames": "wysiwyg-textarea form-control", "value": get(env, context, "content")});
        return fragment;
      }
    };
  }()));

});
define('client/templates/faq/international-students', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Content will go here when it has been written");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/faq/landlord', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Content will go here when it has been written\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/faq/student-tenant', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Frequently Asked Questions for Student Tenants");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Is living off campus for me? ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nCheck out this handy resource Best Choice for Me.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What is the Living Off Campus Certification?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nAn online tool for a heads-up on rental applications, off campus housing costs, landlord/tenant rights and responsibilities & more! It's recommended or required by landlords and the University, and it only takes about 20 minutes to complete. Register or sign-in to www.umocss.org and click the big red Living Off Campus Certification button. Landlords can verify completion online and you're all set.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I search for places to rent?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nFind rentals on the Off Campus Student Services website www.umocss.org. to find rentals. All listed properties are vetted by a University staff member. Use this guide to do an effective search using the Off Campus Student Services website. Narrow your search with your personal needs - proximity to campus, pets, parking, etc. Use other rental search sites like CraigsList with caution - there are many reported scams.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Want to live in an apartment community like Puffton or Rolling Green?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nFor the current semester: Search for shared or vacant apartments with the number of bedrooms you need. Select the unit type Apartment in a Complex, select a complex from the list, and select the move-in date ASAP. Here are extra search tips.\n\nFor next semester: Early is always better. Search for vacant or shared apartments with the number of bedrooms you need. Download the application and other required forms directly from the apartment community website. Staff will take your application materials and begin the qualification process, often including a check of your UMass Conduct record. Some apartment communities will not consider an application from a prospective tenant with a current Conduct sanction. If you have questions about this contact the Dean of Students Office.Once you've been qualified, you'll be assigned a unit and staff will notify you. Here are more search tips.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Can I see an apartment?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nA few apartment communities like Mill Valley Estates in South Amherst have model units. Ask.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Prefer to live in a traditional neighborhood?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nFor the current semester search for shared or vacant rentals with the number of bedrooms you need. How many cars will you have? Check the Unit Types house, or apartment in a house/small building. Here are more search tips.\n\nFor next semester do a search for vacant or shared rentals with the number of bedrooms you need. Pay attention to the number of parking spots. Here are more search tips.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Housemates");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I find a housemate?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nSearch the Housemate/Tenant Profiles and look at the Profiles of others who are looking for housemates.\nYou can also submit your own Housemate/Tenant Profile. Are you a vegan? Do you want to share food expenses? Will you live sustainably? Are you noisy? Will you live with someone who smokes? Others will see your Profile and contact you.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do my housemates and I get off on the right foot together?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nGet together and discuss things like overnight guests, parties, cleaning, studying, pets, sharing food. Use our checklist as a conversation starter.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What other housemate things should I think about?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nThe Off Campus Student Life Coordinators made a short video of things they wish they'd known before they moved in with housemates.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Should we sign a Housemate Contract?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nYes. It's a good idea to put your agreements in writing. You can use this Housemate Agreement.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("I need to talk to my housemates about money. Can you help?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nConversations about money can be awkward. This short video might help.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Moving In ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What should I pack? ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nMost kitchens have limited storage, so avoid bringing duplicates. Here's a general list of what to pack that might help.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("I just paid a Security Deposit. What happens to my money?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nMassachusetts Landlord/Tenant law specifies how landlords must handle your security deposit. If they don't follow the law, they may forfeit the right to keep it. Read this article called Security Deposits A-Z. If you need more information contact the Student Legal Services Office.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What is renter's insurance? Where can I get it?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nWhen you rent, your landlord's insurance usually only protects the building. For about $15-$20 a month, renter's insurance helps make sure you can replace your belongings like electronics, clothing, furniture and other valuables. Renter's insurance also includes personal liability coverage in case someone is injured while visiting you and you're held liable. If your parents carry a homeowner's policy, check the terms and determine what their policy will cover. Read more...\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What do I do about utilities that aren't included in my rent? ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nContact that utility directly to set up your service. It's important to do it as early as possible. Off Campus Student Center staff made this short video.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I get internet and cable off campus?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nComcast/Xfinity provides cable and internet services to residences in Amherst. Free installation is available through the local representative.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Moving Out ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I get my Security Deposit back?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nLeave your place 'broom clean'. That can mean different things to different landlords so check with the Student Legal Services Office if you have questions like; Do I have to paint? What if I leave nail holes? or any other question about the security deposit.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("When will I get my Security Deposit back?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nLandlords have 30 days to return your deposit. If they don't do it in 30 days, you may be entitled to receive three times the amount. Read this article called Security Deposits A-Z. If you need more information contact the Student Legal Services Office.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Leases and Subleases ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What makes a lease legal?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nAt a minimum, a lease must have what's called a 'term' which means a start or move-in date, and an end or move-out date. It must also state who is responsible for paying which utilities. The Student Legal Services Office will review your lease if you have questions. It's free!\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How long is a lease?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nUsually 12 months, they typically start in June or September, and there are exceptions.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What if I don't want to sign a Lease?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nSome landlords offer month-to-month rentals called Tenancies-at-Will. Instead of signing a Lease you sign a Rental Agreement. A month-to-month tenancy allows you and your landlord to end the tenancy by giving proper notice. If you have questions about being a month-to-month tenant, check with the Student Legal Services Office.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What's a sublet?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nWhen you give up your rental to someone temporarily, it's referred to as a sublet. Your sub-lessee pays you and you pay rent to the landlord. Check your lease to see if it's allowed and definitely talk to your landlord before you do this! It can be complicated, so it's a good idea to check-in with the Student Legal Services Office before you sublet.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I get someone to take over my lease permanently?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nYou'll do a lease assignment. Check-in with the Student Legal Services Office if you have questions about the process.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I find someone to sublet or take over my lease?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nGo to www.umocss.org Select Housemates/Tenants, then Search Profiles.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What does 'joint and severally liable' mean?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nIt refers to a shared responsibility for rent. You and your housemates are each independently liable to the landlord for the whole rent. The landlord can collect the entire amount from any or all of you.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What does it mean to have a lease guarantor?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nAnother term for guarantor is co-signer. Your guarantor agrees to meet your financial obligations to your landlord if you don't. Since leases are usually 'joint and several' it means that your guarantor is liable for the entire amount of unpaid rent, not just for your share of the rent.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" More About Living Off Campus ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What do I do about recycling and trash?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nHere's what you'll do in the Town of Amherst. Your town may be different. Ask your landlord.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("I'd like to save money by living sustainably. Can you help?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nHere are some tips that will help you reduce your costs and maybe save the planet.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How can I be a good neighbor?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nAll towns follow state laws. All towns have by-laws which cover things like noise, and the number of people that can live together. Here are some of the By-laws in the Town of Amherst. If you don't live in Amherst, check ask your landlord or the Town Office.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What else do I need to know about living in Amherst?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nHere's what the Town of Amherst wants you to know.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("I'm going away over break. What should I do about the heat?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nThe general rule is to never lower your thermostat below 55 degrees Fahrenheit. Lower than that and there's a chance pipes could freeze and burst, do significant damage, and cost you lots of money. You really don't want to go through that!\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Money and Finances ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Will moving off campus change the amount of my financial aid? Is there paperwork I should do?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nNo. There is no financial aid paperwork to complete. There will be no changes to your financial aid if you move off campus. Financial Aid will be posted to your Bursar account like always.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I pay rent using financial aid?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nUse SPIRE to sign up for Excess Express. If you have excess financial aid it will be deposited into that bank account. Most landlords will require you to pay rent by writing checks against that account. Some apartment communities allow you to pay rent online.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What if I don't get my refund right away?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nIf you're getting a refund, the earliest refunds are issued the first day of classes. Lots of factors can impact when you get your excess financial aid. For more information check with Financial Aid Services.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("I'm moving off campus and got billed for on campus housing. What do I do?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nContact Residential Life Student Services as soon as possible.\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("How do I make sure I've budgeted the right amount of money?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nHere are links to some resources that might help you answer the question. Budgeting Essentials, 31 Days of Saving, and the UMass Five Budget Worksheet\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/faq/website-help', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","form-group");
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("label");
          dom.setAttribute(el3,"for","title");
          var el4 = dom.createTextNode("Title");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment(" {{input id=\"website-help.title\" class=\"form-control\" value=website-help.title}} ");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","form-group");
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("label");
          dom.setAttribute(el3,"for","body");
          var el4 = dom.createTextNode("Body");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment(" 					{{textarea id=\"website-help.body\" class=\"form-control\" rows=\"15\" value=website-help.body}} ");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2,"class","btn btn-primary");
          var el3 = dom.createTextNode("Save");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [5]);
          var morph0 = dom.createMorphAt(dom.childAt(element1, [1]),3,3);
          var morph1 = dom.createMorphAt(dom.childAt(element1, [3]),3,3);
          inline(env, morph0, context, "ember-ckeditor", [], {"value": get(env, context, "title"), "on-change": "titleChanged"});
          inline(env, morph1, context, "ember-ckeditor", [], {"value": get(env, context, "body"), "on-change": "bodyChanged"});
          element(env, element2, context, "action", ["save", get(env, context, "title"), get(env, context, "body")], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","btn btn-primary");
          var el2 = dom.createTextNode("Edit");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["edit"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createUnsafeMorphAt(dom.childAt(fragment, [0]),0,0);
        var morph1 = dom.createUnsafeMorphAt(dom.childAt(fragment, [2]),0,0);
        var morph2 = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        content(env, morph0, context, "title");
        content(env, morph1, context, "body");
        block(env, morph2, context, "if", [get(env, context, "isEditing")], {}, child0, child1);
        return fragment;
      }
    };
  }()));

});
define('client/templates/footer/ocss-student-jobs', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Content will go here once it has been written");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/footer/recent-scammers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("IDENTIFYING SCAMMERS");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("All of the individuals on this list claim to be coming to the University in a capacity other than as an undergraduate student.  Senders are becoming more skillful at constructing a plausible message.  They all, however, fit a pattern that's pretty easy to spot ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("by looking at some of the examples below");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".  [Here's a recent sample] received by a student posting on Craigslist and forwarded by a parent.(http://www.umocss.org/files/SCAM%20Template.pdf)  If you feel unsure about the legitimacy of an inquiry, we suggest using these templates to frame your reply:  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("TEMPLATE 1: Send to those claiming to be UMASS GRAD STUDENTS:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("Thank you for your inquiry.  Please provide your UMass campus issued email address and/or contact information for your Academic Department.  I will need this information before we correspond further.  In the meantime, welcome to the University.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("TEMPLATE 2.  Send to all others claiming to have a UMASS AFFILIATION:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("Thank you for your inquiry.  Please provide the UMass campus issued email address for a UMass faculty or staff member with whom you have communicated. I will need this information before we correspond further.  In the meantime, welcome to the University.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Forward \"suspect\" emails to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","tcostine@umass.edu");
        var el3 = dom.createTextNode("tcostine@umass.edu");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Consider reporting them to the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.ic3.gov/default.aspx");
        var el3 = dom.createTextNode("FBI Internet Crime Complaint Center.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Emails labeled as ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPEAT");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" have been reported by multiple users on multiple occasions. ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JUNE 2015");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("6/6/15:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("biyu93@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" standard scam.    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MAY 2015");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/29/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("duncanjoy12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" this is a standard scam, asking questions that were clearly available in the listing.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/22/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("paulhartcares007@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" claimed to be renting an apartment in the Boulders that doesn't exist.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/21/15: REPEAT OFFENDER (see 5/2/15) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("johanagry@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ...My name is JOHANA HARPER, I'm a 24 years female from Canada...i will not be able to come and see the place due to distance...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/2/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("johanagry@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \nStandard scam.  Asserting that the check will be sent by her boss, asking questions that are in the listing.  The \"boss\" is using this email address ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bellscontracting@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and this phone number for a \"travel agent\" 347-979-0514 who claims to be from Texas.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN APRIL 2015");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/27/15:REPEAT OFFENDER (See 4/4/15 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bbl2walker@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  will send a check from 'her Dad' for more than amount owed.  There's no grad student fitting this decription at the University of Wisconsin-Madison.  This is a scam.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/14/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("littlearsenalgirl@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" usual scam asking for all the details found in the rental listing, individual calling themselves 'Cherry Adams'.  Reported by 3 different users.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/4/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bbl2walker@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  writing as 'cristina walker' individual claims to be a grad student from University of Wisconsin-Madison doing an internship in Cuba.   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2015");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/16/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("vhkfrench@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" standard scam");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/13/15: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("t.martyshchenko@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" This individual is using the name of a real professor at Alabama University and a phone number with an Alabama exchange, however, on further investigation this is a scam.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/8/15:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("fisherjessy8@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Individual will send a certified check that the bank will identify as fraudulent.   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JANUARY 2015");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/29/15:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("borislock82@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Despite all the life history details, this is definitely a scam.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/22/15: REPEAT OFFENDER (see 10/21/14 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("verary003@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  though the email is different it's the same individual claiming to be from France and coming here to do research.           ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN DECEMBER 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/24/14: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("olubelloabosede@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" This happened to me personally.  The individual asserted she was \"moving to U.S. with my little daughter\" to get her MFA at UMass in costume design.  I used the email template, asked for contact information, she replied with fake information.  Thea Costine  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("12/9/14: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rosachan678@yahoo.com.hk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" standard scam who's going to have her \"dad\" send the money to you...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN NOVEMBER 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/5/14: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rebeccasswilliamsonon@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/6/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("camillesportlady001@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  this individual is not coming to UMass to do cancer research.        ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN OCTOBER 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/27/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("fisherjessy8@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/21/14: REPEAT OFFENDER (see 9/25/13 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("veraryoo1@outlook.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" though the email address is different it's the same individual.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/17/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("camillesportlady001@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/17/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("Baoyuchan1@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual is not pursuing a degree in Public Health at UMass \"the prestigious university because of it's immense quality of the course package...\"  Someone claiming to be this individual's father will send a check for more than you're owed asking you to wire excess funds through Western Union.          ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN AUGUST 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/23/14: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("yinbibo@126.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ...I am a chinese man 35 years old. nice. quiet and easy going person...my wife and 5 years old daughter will come visit me...\"  claims to be a visiting scholar.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/22/14:  REPEAT OFFENDER (see 8/20/14 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("XIAOJUN");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/20/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("XIAOJUN");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" We are unable to list the email address (only 'characters' appear).  This individual is not pursuing a degree in Nursing at UMass.  Someone claiming to be this individual's father will send a check for more than you're owed asking you to wire excess funds through Western Union.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/12/14:  REPEAT OFFENDER (see 8/7/14)  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jennydreamlady@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Sent a check for a sublet that was 10 times the amount required, with a story about a business associate who made a mistake.  This isn't real.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/7/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jennydreamlady@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"Let me start with introducing myself and my need;My name Jennifer Martin,23 years female coming to University of Massachusetts Amherst to study Computer Science.\"  'She' then goes on to ask questions that are clearly stated in the listing.  There's no doubt that this is a scam.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JULY 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/7/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rebeccawilliamson0@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  How are you doing and hope every thing is fine... I will be coming for a research program in the state on Anthropology ...A little more about me, Friendly, outgoing, considerate, easygoing, very clean, and responsible... am from England,22yrs old.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("7/4/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("katalyst601@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \"My name is Katherine Sherman and am 25 years old and am from Maple, Ontario...\"   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MAY 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/23/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("laura.hawley1@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Classic scam.  She asked for details that are in the listing, and her \"Dad\" is going to send a check.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/19/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("katalyst601@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My name is Katherine Sherman and am 24 years old, my father is a citizen of Philippines(Southeast Asia in the western Pacific Ocean) while my mom is from turkey and i lost her 2 years ago...am very a quiet, respectful and mature girl....  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN APRIL 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/1/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sweetisabella11@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  How are you doing?Hope God is taking care of you and your family? I am Isabella by name from Manchester(UK) and i am coming for a Research in University of Massachusetts Amherst...");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/26/14:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sweetmariam11@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" How are you doing?Hope God is taking care of you and your family? I am Mariam by name from Mexico and i am coming for a Research in University of Massachusetts Amherst By April so i need a place to stay...   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN FEBRUARY 2014");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/25/14: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sweetisabella11@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ...Hope God is taking care of you and your family? I am Isabella by name from Manchester(UK)... Merry Christmas and Happy New year...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN NOVEMBER 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/18/13: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("elogantlady@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My name Helen Smith,23 years female from Liverpool,I am coming to University of Massachusetts Amherst to study Organismic and Evolutionary Biology...   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN SEPTEMBER 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/25/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("verary05@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Am Vera am 23years old i lost my dad some years back when i was young so my mom had to remarry so she married to Mr Grant howelt who is my step dad now...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/24/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("shdggfgfhgfpdjd@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Am Shelly and am 23years old i lost my dad some years back when i was young so my mom had to remarry so she married to Mr Marcus wilder...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/21/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("martins.belinda11@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JULY 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/31/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("brenie.cole@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Says her name is Brenda from Rhodes University of Cape Town");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/31/13:  REPEAT OFFENDER (see 6/18/12 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthia_mack05@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/31/13:  REPEAT OFFENDER (see 4/28/12 below)   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("world_of_smile_2005@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JUNE 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n6/27/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("whdydklflf@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/27/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mor_bower111@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/27/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("askbucky@uwmad.wisc.edu");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This is not a student from the University of Wisconsin, Madison.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/18/13: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("lor2barton@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \"I am Ms Norma Nichols 26 Years, female, from Zurich,Switzerland...\"");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("6/18/13: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cheneenkimm12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \"I will be coming from China for a research program in the state\" using the name Kim Chen\n6/13/13:  REPEAT OFFENDER (see 6/18/12 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthia_mack05@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This scammer goes by the name Cynthia Mack and claims to be from Manchester(UK)and a Researcher in Harvard University\n6/18/13: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("scotley1@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  using the name Scot Lawson and his daughter is using the name Jennifer Martin and her email address is ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jenny.mart01@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/18/13: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("purerookx101@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  using the name James Dana and his daughter is using the name Sarah James and using the email address ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sarjams1011@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Jennifer Martin says she is from United Arab Emirates and Sarah James is saying she is from Spain");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MAY 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/13/13:  REPEAT OFFENDER (see 9/3/12 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("tom204u@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual claims to be doing research at both UMass and WPI.  Clearly fraudulent.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN APRIL 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/21/13:  REPEAT OFFENDER (see 4/28/12 below)   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("world_of_smile_2005@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/12/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("janeroland805@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Classic scam.  Asserted she's part of the Eisenberg School of Management. \"Father\" (see below) sent a check for more than the amount owed and the check was fraudulent.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/12/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("markrolly12@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual is posing as the \"father\" of janeroland805@gmail.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN FEBRUARY 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/7/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mattdash12@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JANUARY 2013");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/16/13:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rustiano101@mail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN SEPTEMBER 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/20/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("chenkim12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  another of the usual suspects claiming to be doing research at UMass.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/3/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("tom204u@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/4/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("saleh_rajha@mail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN AUGUST 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/27/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("godwillsarina200@yahoo.in");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/27/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("vanesstucker@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" claiming to write on behalf of Anastasia Williams.            ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JULY 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/27/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("florystew@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Don't bother replying to this individual.  There's no doubt that it's a scam.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JUNE 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/21/12: REPEAT OFFENDER (see 12/9/11 below) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("kiokioloome@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ...Well my name is Shelly.. i will be coming from China...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/18/12:  REPEAT OFFENDER. (multiple reports)  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthia.mack111@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/6/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rosiegeorge12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I am Rosie George and i am 22 years  old...I like to respect the rules of the  house. i don't do drugs or drink,and also a Christian...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MAY 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("edwardpaul003@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"My real name is Edward Mary, Female from Barcelona Spain,28,  I believe\nin treating people as i would like to be treated...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ayo.prince600@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"My name is Mary Ann (F),I am 24yrsold,I am fun  loving, personal, friendly,clean and respectful of others...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("nicolles00021@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"Your day was lovely i suppose, I am a female looking for somewhere to stay in your area...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("juliadfetyunmns10@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"My name is Rose Ward (F) I am 27yrs old,I am fun  loving, personal, friendly,clean and  respectful of others. A non-smoker, don't do drugs, i drink  occasionally,and drama\nfree. I graduated last year in France...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("manatalynn12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"My name is Trina Harris (F),I am 27yrs old,I am  fun  loving, personal, friendly,clean and respectful of others. A  non-smoker, don't do drugs, i drink occasionally,and drama\nfree. I  graduated last year in France...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/16/12:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("grace.martins111@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"How are you doing?Hope God is taking care of you and your family? I am\nGrace by name from Manchester(UK) and i am coming for a Research in University of Massachusetts Amherst...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/14/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sarinagodwill371@yahoo.in");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("     ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN APRIL 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/28/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("world_of_smile_2005@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"...I would love to view the place before renting but I'm not in town yet so tell me how to get the place secured before my arrival. Little about me, I'm 22 year from Washington DC, I have 1 sister and 2 brothers, neat, no overnight guest, no weed, I'm respectful and mind my own business...\"  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/23/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("naomingiga20i2@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/21/12: REPEAT OFFENDERS ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jvincent_001@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("macks_fabrics@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Multiple reports about \"Joy\" and her \"Father\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/21/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("chenkim12@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"...Well my name is Kim.. i will be coming from China for a research program in the state and i will need either ROOM/APT/HOUSE to stay when i get there...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/20/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("lglg8201@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"...i am Vera by name,from France coming to United state for some research program and studying of international relation...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/13/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("whdydklflf@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"Well my name is Shelly.  i will be coming from China for a research program in the state...\"  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN FEBRUARY 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/28/12:  REPEAT OFFENDER (See 4/29/10 below.)  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthiamack01@hotmail.co.uk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Also note: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("macksprivatefabrics@googlemail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" this is \"her father\".");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/28/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("catherine_parker@ymail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/9/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("lrngllrm9@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   \"...Am very happy to hear that the place is available...But the issue is that because of the distance i wont be able to come down to see the place...I will want you to send me some pics so that i can forward it to my step dad...\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/9/12:  REPEAT OFFENDER (See 1/19/12) ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jvincent_001@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"How are you doing?Hope God is taking care of you and your family? I am Joy by name from Manchester(UK) and i am coming for a research in University of Massachusetts Amherst By March so i need a place to stay. A little about me. I  am 28 years old,i gentle...\"    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JANUARY 2012");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/31/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("hfhfssllsjs@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"...am Shelly and am 23years old i lost my dad some years back when i was young so my mom had to remarry so she married to Mr Marcus wilder who is my step dad now..");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/19/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jvincent_001@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/19/12:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("hfhfssllsjs@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN DECEMBER 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/12/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("candanturkkan@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/9/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("kiokioloome@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ...my name is Shelly.  i will be coming from China for a research program in the state...    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN NOVEMBER 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/18/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("verryvera4love@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"i am Vera by name,from France coming to United state for some research program and studying of international relation...\"  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN OCTOBER 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/24/11:  REPEAT OFFENDER (see 10/6/11)");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("amanda.pittss@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This is not a legitimate inquiry, nor is the inquiry from the \"parents\"  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jamesandsarahpitts@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".  Any check sent is fraudulent.  Report to bank and local police.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/13/11:  REPEAT OFFENDER (see 9/19/11)");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("frankwhite10003@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual is NOT a member of the U.S. Armed Services stationed in Iraq.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/6/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("amanda.pittss@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I'm 25 year from Washington DC, I have 1 sister and 2 brothers, neat, no overnight guest, no weed...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN SEPTEMBER 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/26/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("amanda.pittss@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I'm 25 year from Washington DC, I have 1 sister and 2 brothers, neat, no overnight guest, no weed...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/19/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("FrankWhite1100@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual is NOT a member of the U.S. Armed Services stationed in Iraq.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/9/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("marygoldkimudi@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Compliments of the day!  How are you? hope you are doing well, I am Marygold, A lovely and decent girl, I saw your contact details at website...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/9/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cisseaminata@pobox.sk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Donation For God's Work.  I am Mrs.Mrs Favour Philips from Kuwait. I am married to Mr.Solomon Philips. who worked with Kuwait embassy here in Ivory Coast for nine good year \nbefore he died in the year 2008... This individual is looking for money.   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN AUGUST 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/25/11:  REPEAT OFFENDER (see 12/15/10)");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mariamscott2010@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  How are you doing?Hope God is taking care of you and your family? I \nam Mariam by name from Manchester(UK) and i am coming for a Research in University of Massachusetts Amherst By September...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/11/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("s_kenzoh@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/8/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("nomvuyo_makana@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/8/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("marydavid165@att.net");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/8/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("maryanderson1979@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/4/11:  REPEAT OFFENDER (see May 2011)    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jessicabenson00@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JULY 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/28/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("tancheelan022@att.net");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/27/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ljs435@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JUNE 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/16/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("t.altintoch01@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" This individual claims to be working for a United Nations organization and is offering to send a check for a full year's rent in advance.  It's not legit.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/16/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ed_19000@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  How are you doing today... Here is a little info about myself. I am Emily Dylan and I'm 27 years old...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n6/14/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("martintaggart@live.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" This individual sent a \"bank check\" as payment for the entire value of his daughter's lease, then reported that his daughter had been in an auto accident and asked for the return of the payment. The original \"bank check\" bounced.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MAY 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/30/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jessicabenson00@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My names are Jessica Benson.I'm a 23yrs of age female student coming from UK, Scotland, ...  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("This individual is going to tell you that her Father will be paying her rent.  It's a scam.  Don't bother to reply.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n5/12/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bakerpaul590@gmail.com*");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/28/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("aviva_00@att.net");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/25/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("\"Cynthia Mack\"");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("\"her Dad\"");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" have been reported by several of you.  These are not legitimate inquiries.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN FEBRUARY 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/22/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("vivian_smith83@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/22/11:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthiamack_05@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"She's\" been reported here multiple times and usually has a \"father\" who's going to come up with the money.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/9/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("rose_edds01@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  Sometimes she's \"Rose\", sometimes she's \"Sandra\".  Either way this individual is not a legitimate inquiry.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n2/8/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ken.todd@rocketmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My name is Ken Todd from United Kingdom. I am interested in your room for rent and i am willing to have it for my 23yrs daughter who just got through with her college in Uk and just gained admission to study in Usa...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JANUARY 2011");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/4/11:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bout.laura@att.net");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   name is Laura i am happy to contact you here with all my heart...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN DECEMBER 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/28/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("christana.porche@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/21/10:  REPEAT OFFENDER  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("anna.krone001@yandex.ua");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/21/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("martintaggartinc@live.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" This is the same individual that appears below on 12/8/10.  The scam remains, only the email address is different.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/15/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mariamscott2010@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  How are you doing?Hope God is taking care of you and your family? I am\nMariam by name from Manchester(UK)");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/14/10:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("robinson@mail.med.upenn.edu");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("anna.krone002Ayandex.ru");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nWe were contacted by the owner of a B&B in the village of Coleraine in Northern Ireland who reported this individual who previously represented \"herself\" as being from Scotland.  She's actually from the Ukraine.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/8/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ppate221@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/8/20:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("vh81571@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Another \"Vera\" who's 23 years old whose Mom remarried...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/8/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("granthowelt@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" will represent himself as \"Vera's step dad\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/8/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("martintaggart@live.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  This individual represents himself as the \"father\" of ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("patriciataggart45@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" a REPEAT OFFENDER reported below.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/1/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("anna.krone@yandex.ru");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" My name is Anna krone, a 23 yr old female...   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN NOVEMBER 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/30/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("drectly:0102m1@att.net");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" and ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("yangmikel@centrum.sk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ...An arab made a fixed deposit of $4,500.000.00 in my bank branch where am a director and he died with his entire family in the war leaving behind no next of kin,if you choose to stand as my deceased client's next of kin...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/30/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("vh81571@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ...,i am Vera by name,from France coming to United state for some research program and studying of international relation...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/23/10:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("patriciataggart45@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I`m an incoming transfer student studying geology...i will be moving to State as soon as i leave here (SCOTLAND).\nPlease contact me if the rent is still available, preferably through my email address");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/23/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("patriciataggart45@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I am 23yr old girl...will be coming by 15th of Next month for my master program...I am currently in Scotland...i don't drink alcohol and i am a christian...i want you to get back to me with the following information so that payment could be mail out to you ...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n11/12/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("evira.sadiku01@rediffmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I am miss Evira Sadiku , 21 years old from ivory coast... So i seek your permission to remit this amount to your country... I have decided and accepted to offer you 20% of the total sum for your desire to assist me.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN OCTOBER 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/28/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("joanmack01@yahoo.co.uk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("   How are you doing?Hope God is taking care of you and your family? I am Joan by name from Manchester(UK) and i am coming for a Research in University of Massachusetts Amherst By December 1st...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/27/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("gurld8rluvsu5710@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My name is Serenity Small. I am sending this e-mail to inquire about an apartment you have for rent in (City)...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/25/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("chrstbllnds@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  i am Karina by name,from France coming to United state for some research program and studying of international relation...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/21/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("karry4real@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  i am Karina by name,from France coming to United state for some research program and studying of international relation...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/21/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("granthowelt@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  representing himself as the step father of Karina above.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/21/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("leorajudah@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I am Leora, how are you doing today... my Dad will be responsible with the payment of rent for my period of stay...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/19/10:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mikefarebooking@consultant.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  see 10/7/10");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/7/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("omikymicheal@yahoo.co.uk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Presents as seeking housing for international families taking \"Arts and Crafts\" classes.   ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN SEPTEMBER 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/2/10:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("a.melson1@yandex.ru");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\"Purpose of coming to your country is that I lost my fiancee of recent and my life has been totally upside down... ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN AUGUST 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/31/10: REPEAT OFFENDER (See 3/3/10 below)  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("a.melson1@yandex.ru");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  I saw your ad . my name is alexandra melson, a 23 yr old female.  I would be needing a place to reside during my stay in your country and I will like to have your place...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/23/10: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sarah.simpson74@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nI am interested in your rental listing....I am 23 year old,single and nice....Thank you and God bless you.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/12/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bobby_fisher@live.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n...I just want to let you know that my son's payment was delivered to you today with tracking number...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/12/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("fisherjames501@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nThe alleged \"son\" of \"bobby_fisher\" just above.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/11/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jamespatton000ju@hotmail.co.uk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/10/10:  REPEAT OFFENDER ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("viviansmith1983@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/5/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("viviansmith1983@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nHow are you doing?Hope God is taking care of you and your family? I am Vivian by name from Manchester(UK) and i am coming for a Research in University of Massachusetts Amherst By September 2010....");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n8/2/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("karinagrant001@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nIt is my pleasure to write you this note,i am Karina by name,from France coming to United state for some research program and studying of international relation...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JULY 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/29/10: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("taras316@yandex.ua");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nMy name is vicka Taras, a 23 yr old female (reportedly from the Ukraine, coming here to get over a broken heart)...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/16/10: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("lilian123yao@yahoo.co.jp");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nMy name is Lilian Yao, I am 20 years old girl this year I am from the Ivory coast and I lost my parents...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n7/12/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mourenahmed@rediffmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nMy name is Moureen Ahmed a young girl from Ivorie...  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN APRIL 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/29/10:  REPEAT ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("cynthiamack01@hotmail.co.uk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/29/10:  REPEAT ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("macksprivatefabrics@googlemail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nAlleged \"father\" of Cynthia Mack.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/28/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("osmac2b_2002@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  My name is Laura...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n4/16/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("summer4uni@aol.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nMy name is Summer Hopkins .am 22 and will be 23 in October. I am doing my internship and research work in Cyprus  and will be back in a month for my masters degree....  I will also like to know if I can make an advance payment ahead my arrival that will be stand as a kind of commitment that I am truly coming over to rent the place which will also serve as a collateral for you to hold the place for me, upon my arrival to move in.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN MARCH 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/15/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sharondirks1980");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/11/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("sharondirks1980@live.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n...Please confirm the delivery of the deposit.I need to get something sorted.  Let me know you got the check in your mailbox or in front of your door.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/8/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("ashleyking776@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nI am 21 years coming over to study from London in the UK and i will be very happy if i can have the place secured. All the bills will be taken care of by my parents.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/4/10: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("angelakendrick@rocketmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nMy name is Angela, I'm a 21-year-old and I am coming to University of Massachusetts Amherst...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/4/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("princelectronicsltd_02@hotmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nAllegedly \"Martins Scott\" the stepfather of Angela");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3/3/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("a.melson1@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\"my name is Alexsandra Melson  , a 23 yr old female .... I would like to move in by the 15th of mar. 2010 .\" \n3/1/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("bizevaluationserviceinc@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nAllegedly a renter named Miss Sharon Dirks from England  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN JANUARY 2010");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/7/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("susanbaily01@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n1/3/10:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("susanpasek@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN DECEMBER 2009");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/30/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("roynurnberg@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nAllegedly the father of \"stefan\"\n12/30/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("stefannurnberg@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nI am 22 years old girl coming from Dublin in Ireland...");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n12/27/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("dikesmith44@gmail.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nSeeking housing for 6 newly ordained priests from Greece.  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN OCTOBER 2009");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n10/26/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jvincent_001@yahoo.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nHow are you doing?Hope God is taking care of you and your family? I am Joy by name from Manchester(UK)  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("REPORTED IN SEPTEMBER 2009");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/23/09: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("renmmanu1@richsaloon.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nI'm Mrs Reny Manuel, the wife of late Mr.Donjon Manuel former Chief financial adviser to the President during President Joseph Estrada regime in Philippine.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/23/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("mrslydia.marcus1955@apnamultan.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nI am Mrs Lydia marcus From Ivory Coast,i will like to know more of you so that i will entrust my hope on you about my late husband wishes... \n9/23/09: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("lydiamarcus1955@yahoo.com.hk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/9/09:   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jasdiop_11@msn.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \"Justine\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/9/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("jsa_5013@msn.com");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \"Justine\"");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n9/9/09:  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("strong");
        var el3 = dom.createElement("em");
        var el4 = dom.createTextNode("inadiop42@yahoo.com.hk");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \"Justine's father/uncle\".  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("PREVIOUSLY REPORTED");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\ncynthiamack01@hotmail.co.uk");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nmacks");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("fabrics@hotmail.com");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\njamessmithcrat@yahoo.com");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\nsmithmelly1976@googlemail.com");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\nharrisonlorraine@ymail.com");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\nhel");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("smith@yahoo.co.uk");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\njohnsonkomah@voila.fr");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nednajohn007@gmail.com");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\njulswelsh@gmail.com");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n3rd report 9/3/09: lindabergin7@yahoo.com");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nreported 8/15/09: bob_hopskin001@yahoo.com");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nreported 8/17/09: smithm77@rocketmail.com");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/footer/service-expectations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Service Expectations");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Exceptions to what you see here will be noted in a gray box in the middle of the homepage.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("MON - THU");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Acknowledgment of voice and email messages sent in 24 hours.\n		Rental listing status acknowledgment sent same day if submitted by 12pm.\n		Housemate/Tenant Profiles posted the same day if submitted by 7pm.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("FRI");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Acknowledgment of voice and email messages sent next business day. Rental listing status acknowledgment sent same day if submitted by 12pm, otherwise sent during weekend. Housemate/Tenant Profiles posted the same day if submitted by 7pm, otherwise posted during the weekend.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("SAT and SUN");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Rental listings and Profiles will be posted at least once each weekend. Rental listings and Profiles that cannot be posted will be acknowledged the next business day. Other communications submitted on Saturday and Sunday will be acknowledged by the end of the day Tuesday.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/communicating', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Communicating with your Housemate(s)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		We all know that the most important aspect of any relationship is open, honest, non-manipulative communication. It’s easily said,\n		but sometimes it’s hard to do. Just with any relationship it’s important to begin your experience as housemates with a strong\n		foundation of open communication. Having some basic knowledge of these aspects of communication may help contribute to\n		building a successful household.\n		Communication includes both verbal and nonverbal messages. The different parts of the message you convey have different levels\n		of effectiveness in terms of influencing the listener.\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"type","square");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" The words you use - 11% ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Your tone of voice - 32% ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Your body language, facial expression, other non-verbal cues - 57% ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		Although you always want to choose your words carefully, how you say them and how you appear when you say them is even more important.\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"type","square");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Understand your own communication style so that you can adapt to the styles of your housemate. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Actively listen. Non-verbal communication is just as important when you are an active listener as when you are speaking. Your housemate will notice nonverbal cues to whether or not you are interested in the conversation and are paying attention. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Negative cues may discourage your housemate and block further attempts at communication. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Give feedback to show that you have been listening actively, but wait until your housemate has finished conveying his/her\n			message. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" If your housemate asks you to just listen and is not looking for a response, you should respect those wishes. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		These steps will give you an idea of your listening style as well as showing what improvements could be made. \n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ol");
        dom.setAttribute(el2,"type","1");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Listen closely to the story without interrupting. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Once your housemate is finished, repeat the story back to him/her. This doesn’t have to be word for word but should include the main points of the story. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Have your housemate confirm whether your understanding is accurate. ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode(" Ask questions to learn more details. Be direct, courteous and calm. Spare others your unsolicited advice and acknowledge that what works for you may not work for others. Be sure to state your main points first and then offer details, if necessary. Also listen for hidden clues about feelings and take notice of any nonverbal cues from the other person ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/edit-profile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/getting-to-know', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Conversation Starters\nHow to Get to Know Your Housemates (even if you already are friends)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		It really doesn’t matter whether this is your first place or your seventh, whether your lease is for a year or just for the summer.\n		Chances are you’re going to be living with housemates, and chances are there will be times when you’ll have disagreements.\n		Whether you were roommates or best friends, lived in the same residence hall, were in classes together, or if you’re just meeting for\n		the first time, there will times when there’s conflict between housemates. Sometimes these disagreements can be avoided by\n		having these five “get to know your housemates” conversations beforehand. These are things you may want to document in a\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.umocss.org/pdfs/SF%20Housemate%20Agreement.pdf");
        var el3 = dom.createTextNode(" Housemate Agreement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Locking Up");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		There’s no Residence Hall Security to keep the “bad guys” out of your neighborhood. This is all on you and your housemates. The\n		first conversation we recommend you all have is this one. Did anyone tend leave their rooms unlocked in the residence halls when\n		they went down the hall to the bathroom? Not a good idea but it’s something we did and nothing bad happened. Does anyone\n		leave the door unlocked when they run out to the mailbox? What about if they’re just running next door to the neighbors? Again,\n		not something the police would recommend, but again, it’s something we sometimes do. The fact is you’re in a lease with these\n		people and most folks will do what they’re going to do. The housemate who’s always getting locked out is probably always going to\n		tend to want to leave the door open because they can’t find the keys. There’s not much you can do to change that, but at least have\n		the conversation together so you know. You don’t want anyone to get locked out, but you also don’t want anyone’s stuff to get\n		stolen. Renters insurance anyone?\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Sharing Items");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		If it’s in the living room, is it okay for everyone to use? It’s important to decide what items in the household can be used by\n		everyone, and what things are not be shared. Are there food items that are okay to share? Will everyone buy their own jar of\n		peanut butter or will you take turns buying peanut butter? What about milk or juice, or butter? How will refrigerator space be\n		divided? What about the kitchen cupboards? Is there enough space for everyone to have their own cupboard or will you be forced\n		to share? What about toiletries? Is it okay to borrow shaving cream or shower gel? And cleaning products? Will you all split the\n		cost? Can items be borrowed when their owner is not present? Is there anything that shouldn’t be touched under any\n		circumstances? There’s no right or wrong answers. Just some things to consider as you set up your household.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Music, Television and Video Games");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Music. TV. Video games. Most of us use one or all of these forms of media and technology, but, we often use them in different\n		ways. Ever missed an episode of Game of Thrones, or How I Met Your Mother because your housemate was hooked up to the TV in\n		a six-hour marathon gaming session? Irritating when it happens. Majorly irritating if it happens all the time. What about music?\n		One housemate uses headphones, the other one believes that music is best shared with the entire house. One housemate listens to\n		country, the other to “techno” and you can’t stand either. These can be sources of disagreement and conflict unless you talk about\n		it beforehand.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Sleeping");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Some of you left the residence halls because you wanted to get more regular sleep (among other things). Some of you are moving\n		from your family’s home and are living off campus for the first time. Everyone knows that not being able to get enough sleep can\n		make a person really grumpy. A grumpy, really tired, “ticked-off” housemate can make everyone’s lives miserable. We recommend\n		is to talk to your housemates about sleep. If you’re sharing a bedroom, talk to your roommate too. Who’s got early classes? Who\n		works the breakfast shift? What’s a reasonable time you all should expect to go to sleep on weekdays? Is it different on weekends?\n		Well of course it is, but talk about it. Does anyone work nights? Do they nap during the day? One other thing to talk about is exams. Everyone handles the pressure of exams/deadlines differently. Will any of you stay up all night? What other things do you\n		tend to do during exams that’ll impact sleep (or lack thereof)?\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Guest and Visitors");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		This last conversation could be the most important. What happens when one of your housemates has a boyfriend or girlfriend\n		who’s there all the time? Maybe they finish your milk or maybe the last of your cereal gets eaten, or maybe they take really long\n		showers, and doesn’t contribute to the cost of heating the water or buying the food? As unlikely as it may seem now, it’s good to\n		have a conversation about “guests”. This is also important if you are someone who likes to have friends over often. Do your\n		housemates want to know ahead of time if you’re entertaining guests or having someone over? Do you want to have an agreement\n		about days of the week or times (like maybe exam periods) when you really don’t want to have guests in the household? What\n		happens if your roommate’s guest breaks something?\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("More Conversation Starters");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Still need some help getting started? Here’s a list of questions other students have suggested as a way to start the “get to know\n		each other” conversation. Maybe they’ll help you.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"type","square");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What name do you like to go by?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Where are you from?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Where else have you lived? (When was that? Did you enjoy the experience?)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" How old are you?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" When is your birthday?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Why did you come to the UMass?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Where did you transfer from?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What are you studying?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What are your favorite things to do?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What kind of activities were you involved in during high school/college?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What TV shows or movies do you like to watch?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What types of books do you enjoy reading?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What is your family like? Do you have siblings? (How many and how old are they?)");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What types of hobbies or activities do you enjoy?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What type of music do you like listening to?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What sports do you play?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What sports do you like to watch?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What type of exercise or training regiment do you follow?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" How do you feel about living away from home?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What kinds of activities do you want to become involved in on campus?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What kind of neighborhood did you grow up in?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What are your friends like?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What, if anything, do you find interesting about religion or spiritual beliefs?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Is your lifestyle affected by your religion or spiritual beliefs?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What jobs have you held and where have you worked?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" Have you ever been in the military or traveled?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode(" What pet peeves do you have?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/household-rules', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Housemates Checklist: Establishing Your Household Rules");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	Whether you’re just subletting for the summer or looking to move into a new place there are bound to be “issues”. This checklist is designed to help you and your housemate(s) establish guidelines to follow while you are living together. These are the issues that most typically cause conflict between housemates. Discussing your preferences and resolving differences now could potentially help you to avoid conflicts in the future.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("1. Guests/Parties ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" When is company acceptable? Is it different on weeknights and weekends?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will you give each other notice if you’ll be having company or friends over?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Can your guests stay overnight? What about the rules when a housemate is in a long term relationship?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Can overnight guests be male and/or female?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Do you want to be notified in advance if your housemate(s) is entertaining?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" How many friends can you have over at any one time and how often? Is it a party? Double check with your landlord and your town because there are limits on the number of friends you can have over.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Who will clean up afterwards?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Are there specific times or days when friends, guests, or parties are not allowed?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("2. Food/Shopping/Household Supplies");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will you buy your own food or will all food costs be shared?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will you cook individually? Do you want to create a rotating schedule where someone cooks for everyone?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Is borrowing food acceptable? What foods? How will you handle replacing borrowed food?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" How will the cost of household supplies (such as cleaning supplies, toilet paper, dish detergent, etc.) be divided?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("3. Cleanliness/Cleaning Responsibilities");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" What about doing the dishes? After each meal, at the end of the day, or when all the silverware is gone?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Who’s’ going to clean the bathroom?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Who will clean common areas and how often?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will you create a schedule defining who cleans what or spend one day each week cleaning together?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Be sure to take into account tasks such as sweeping/vacuuming, emptying the trash, dusting, tidying up the room(s), cleaning the kitchen, bathroom, etc.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("4. Community/Personal Property");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Can you borrow or use items such as the stereo, television, a hairdryer or curling iron, clothing, and computer? Do you prefer to be asked before borrowing?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Can your housemates go into your bedroom to get personal items when you’re not there? ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" How will the use of community items (refrigerator, shared furniture or appliances, etc.) be divided between housemates?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("5. Study Hours/Sleeping");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" What hours and days will be set aside for study time?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Can you play low background music?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" What time do you expect to be able to go to sleep on weeknights and weekends?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" What time is it reasonable for your place to be quiet during the week? On the weekend?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Do you expect to be able to nap?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("6. Pets");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style-type: circle;");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Do you have allergies that would require banning certain types of pets?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will pets be allowed in common areas?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode(" Will all of you be responsible for the care of the pet?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/living-with-housemates', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Living With Housemates");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("center");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2,"width","560");
        dom.setAttribute(el2,"height","315");
        dom.setAttribute(el2,"src","https://www.youtube.com/embed/7xUdTKT1kEg?list=UUMHZVk9tGVeXxg5ZUygXhyA");
        dom.setAttribute(el2,"frameborder","0");
        dom.setAttribute(el2,"allowfullscreen","");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/managing-money', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Managing Money With Your Housemates");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("i");
        var el2 = dom.createTextNode("(in collaboration with UMass Five College Federal Credit Union)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Communication with your housemates is vital to prevent late payments, late fees, and a tense living situation. Here are some useful tips that will help you and your housemates manage your shared expenses.\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ol");
        dom.setAttribute(el2,"type","1");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Have a house meeting as soon as you move in. Try to find time to meet at least monthly. You can also talk about things other than the bills; like maintaining shared spaces (kitchen, bathroom, etc.) and sharing other items.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Purchase a whiteboard of other “communication hub.” Put it in a common area. Use it to put all your bill amounts and due dates in one place where everyone will see it.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Plan ahead. Know what is due when. Bills often seem to be due sooner than you expect so to prevent tension, let everyone know what payments are coming up.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Designate a point person. The point person is responsible for ensuring that a particular bill is paid on time and for making sure housemates know about costs and due dates.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Communicate terms of a bill. Failing to pay a bill on time can hurt your credit score and result in late fees. When you get your first bill tell your housemates about amounts, due dates, and other terms.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Talk openly about variable (amount different month to month) expenses. One housemate may leave windows open while the other is always cold and cranks the thermostat to 75 degrees. By having an honest conversation about preferences, needs, and the amount you can afford to pay, you have a better chance of avoiding conflict, late payments, and unexpectedly large bills.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Have a contingency plan. Even if everyone usually pays every bill on time every month, there might be a month were someone is caught short and can’t pay their portion of the bill. Make a plan with your housemates for what you will do if a bill is unexpectedly high	or some other event makes it difficult to get money to pay a bill on time.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n				Compromise is one of the most important tools at your disposal. By meeting regularly	with your housemates and having a plan, you are able to maintain a positive living environment.\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		Your life as a student will be stressful enough just dealing with classes, work, and all the other life situations that will happen. If you have these conversations with your housemates at the beginning you’ll have a better chance of avoiding adding ‘money troubles’ to your time together. \n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/resolving-conflicts', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Resolving Conflicts with Housemates");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	Having a conflict with a housemate? Disagreements are inevitable, especially when people live together and interact everyday. Try\n	not to be too concerned about confronting your housemate(s) about what’s bothering you. If you made a Housemate Agreement\n	when you moved in, pull it out. Look it over. Is there anything in that Agreement that will help you have the conversation? If you\n	didn’t do a ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.umocss.org/pdfs/SF%20Housemate%20Agreement.pdf");
        var el3 = dom.createTextNode(" Housemate Agreement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", maybe now’s the time. \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Here are 10 Effective Ways to Handle Conflict:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ol");
        dom.setAttribute(el1,"type","1");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Make sure you have enough time to have the conversation. Instead of bringing up the issue as your housemate is walking out the door for class,\n			find a time when you can both sit down and talk about the conflict.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Remember that you and your housemate(s) are entitled to the same right to be heard in the discussion. It may help to pick a neutral location to\n			meet to discuss the conflict.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Enter into the discussion without the desire to “win.” Resolving a conflict with your housemate requires that you find a workable solution, not\n			one where one person “wins.”\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Try to take a step back and view the situation from the perspective of your housemate(s), and ask them to do the same. Understanding the\n			problem from each other’s perspectives will help find an agreeable solution.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Talk about actions that a person can change rather than aspects of your housemate’s personality. Personal attacks make it harder to effectively\n			communicate with your housemate(s) about the issues at hand.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			If you have more than one housemate, it’s important that you avoid teaming up with one housemate against another. It’s going to be important\n			for all of you to work together to resolve the situation. Teaming up against one housemate will only make it harder to find a workable solution.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Take into account any cultural differences that could be adding to the situation. If your housemate comes from a different background, it may\n			be that your differing customs and values are affecting the situation and the way you each handle conflict. Try and keep the lines of\n			communication open and find ways that you and your housemate(s) can feel comfortable discussing these differences.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			Make the decision to remain calm and patient while working out a solution. If the discussion escalates into an argument, it may be best to stop\n			and cool off. It may to take a break and come back to the discussion later on.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			If your housemate(s) begin fighting unfairly, it is up to you to get the conversation back on the right track. It is best to set a positive tone from\n			the start and maintain it throughout the conversation.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n			It may be helpful to give your housemate(s) time to think about the situation (at least overnight). Your housemates(s) may then be able to\n			better discuss his/her perception of the conflict, which will lead to a more satisfactory solution.\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/search-profiles', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/submit-profile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/housemates/talking-about-money', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Talking To Roommates About Money");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Talking about financial issues with a roommate can be tricky, but if you communicate openly and politely about bills, rent, and other money-related concerns, you'll set your entire house up for success.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("	\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("What You'll Learn");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	A roommate \"contract\" can help you avoid financial fights (seriously!).\n	How to avoid letting your emotions get in the way.\n	Why you should be open to your roommate's side of the story.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	There's a lot to figure out when sharing a home with one or more people—who gets the bigger room, whose turn is it to sweep the living room, what color to paint the kitchen.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Open communication among housemates is essential to successful shared living, but it's perhaps most important when it comes to financial issues. Talking about money can be awkward and even emotional, so here are a few ways to help those conversations go smoothly.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Work Out A System");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	When you move into a new living situation, you don't want to assume that financial problems will sort themselves out. If you wait until an issue presents itself to figure out a solution, you may end up with a bigger mess—especially if you and your roommate disagree on how to deal with these concerns.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Save yourself the trouble by agreeing on a contract of sorts at the start. In this agreement, explicitly lay out how you will split bills (electric, cable, gas), rent, and other communal expenses—like cleaning supplies and toilet paper. You can even decide if there are any additional things you want to share (like groceries) and how you'll split the cost.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2,"width","560");
        dom.setAttribute(el2,"height","315");
        dom.setAttribute(el2,"src","https://www.youtube.com/embed/mzBxDcLdW0I?list=UU9xCkqX6xlUWIkOe4Ti8LEg");
        dom.setAttribute(el2,"frameborder","0");
        dom.setAttribute(el2,"align","right");
        dom.setAttribute(el2,"allowfullscreen","");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Approach this conversation with a friendly but professional attitude. Treating it as a business interaction will help you be upfront, polite, and honest about your needs and your concerns. Also, like a business interaction, put everything you decide into writing. This may feel too formal (or too much like Sheldon's roommate agreement on The Big Bang Theory), but you'll be happy to have something to refer to in the future if you need to.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Avoid The Heat Of The Moment");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	If you find out that your roommate forgot to pay the gas bill or encounter some other problem, you might feel the impulse to confront them immediately. Unfortunately, emotions can get the better of us at times like this, leading to heated and less constructive conversations.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Sure, the desire to get to the bottom of the problem right now will be strong. But it's better to wait until you've calmed down. Not only are you more likely to make a compelling argument, but also your roommate won't feel attacked.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Prepare Yourself");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	Another benefit of putting off the conversation until you're more collected? You'll get a chance to prepare your point and anticipate your roommate's reaction, so you're less likely to be caught off guard.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Go through what you'll say one or two times on your own before the actual talk, and imagine what your roommate might say in response. You won't be able to predict exactly how the conversation will go, but preparing will help you stay calm and keep the conversation on track.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	That being said, remember this: Even if you feel your roommate's behavior is outrageous, he or she has a side of the story as well. You'll both be better able to agree on a solution if you both feel like your voice was heard, so give your roommate a chance to present his or her case. The argument might not persuade you, but giving everyone a chance to speak can help prevent your talk from getting out of control.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	Unless the situation is truly out-of-hand—like your roommate refusing to pay the rent—it's generally a bad idea to resort to threats. Even if you could evict your roommate or get your landlord to do the same, those should be last-ditch options. Using them to get your roommate to concede to your point could backfire and shut down the conversation for good, creating more trouble for you. But if you do encounter more serious problems, like if you believe your roommate is stealing from you, report them to the proper authorities.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("The Prosecution Rests … In The Room Next To Yours");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	If your roommate comes to you with a problem and you don't have time to prepare, ask politely if you could discuss the matter later and schedule a time then and there. If your roommate is insistent, keep calm as you listen to their concerns and state your own case. Let him or her finish what they have to say before jumping in—no one likes to be interrupted. Hopefully once they let off some steam, you can have a reasonable and straightforward talk.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	It's important to remind yourself that the outcomes of these conversations might not be exactly what you were hoping for—you might have to wait longer for a check or cover a late fee. Living with roommates is, in the end, about compromise. Don't forget that a successful compromise is still better than getting evicted.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nSource: ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"href","https://www.saltmoney.org/content/media/Article/talking-to-roommates-about-money/_/R-101-2224?Endeca_user_segments=undefined");
        var el2 = dom.createTextNode("SALT Money");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("html");
        var el2 = dom.createTextNode("\n  	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("body");
        var el3 = dom.createTextNode("\n  	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","home-wrapper");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","loc_buttons");
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","row");
        var el6 = dom.createTextNode("\n        \n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","col-md-4");
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","http://owl.oit.umass.edu/partners/umocss/");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8,"src","assets/images/loc_take.png");
        dom.setAttribute(el8,"alt","Take the Training");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","col-md-4");
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","/verify-loc");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8,"src","assets/images/loc_verify.png");
        dom.setAttribute(el8,"alt","Verify Loc Training");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n         ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","col-md-4");
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7,"href","https://owl.oit.umass.edu/owl-c/demo/demologin.cgi?Server=owl-trainingdemo");
        var el8 = dom.createElement("img");
        dom.setAttribute(el8,"src","assets/images/loc_guest.png");
        dom.setAttribute(el8,"alt","Guest Access");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h1");
        var el7 = dom.createTextNode("Living Off Campus");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h2");
        dom.setAttribute(el6,"style","width:92%");
        var el7 = dom.createTextNode("\n            The Off Campus Student Center is an on-campus home for off-campus students. The Center is located in room 314 of the Student Union and is staffed by Off Campus Student Life Coordinators, Graduate Assistants, and professional staff. These individuals act as a resource for students who live or plan to live off campus.\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("center");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("img");
        dom.setAttribute(el8,"src","assets/images/thecenter.jpg");
        dom.setAttribute(el8,"alt","");
        dom.setAttribute(el8,"style","width:50%");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("img");
        dom.setAttribute(el8,"src","assets/images/walkthisway.jpg");
        dom.setAttribute(el8,"alt","");
        dom.setAttribute(el8,"style","width:50%");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("br");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n\n            Walk This Way encourages students to walk on campus rather than along residential streets as they move to and from the Southwest Residential Area. Many neighbors and students have felt the impact of noise, trash, public urination, and vandalism on weekend evenings.\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            The goal of Walk This Way is to encourage students to change their path away from the neighborhoods to minimize this impact while reminding students who choose to walk in the neighborhoods to be mindful of their noise level.\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/emergency-prep', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/fire-safety', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/go-green', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/insurance', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/personal-safety', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/prep-for-breaks', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/town-bylaws', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/living-off-campus/winter-readiness', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/main-pages/contact', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Contact Us");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Landlord/Tenant or Website Assistance");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Contact:  Thea Costine");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Tel: (413) 577-2187");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","mailto:tcostine@umass.edu");
        var el5 = dom.createTextNode("tcostine@umass.edu");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("115 Berkshire");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Hours:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("M, T, W, Th: 8am-5pm");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("F: 8am-2:30pm");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Off Campus Student Center");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Tel:  (413) 577-1005");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","mailto:OCSC@sacl.umass.edu");
        var el5 = dom.createTextNode("OCSC@sacl.umass.edu");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("314 Student Union");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Summer Hours:  11am-3pm");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Semester Hours:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("M, T, W, Th: 9am-6pm");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("F: 9am-5pm");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/main-pages/ocrm', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/main-pages/register', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Sign up:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-6 col-md-offset-3");
        var el3 = dom.createTextNode("\n  	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("\n	  	First Name: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Last Name: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Contact Name: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Contact Information: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Primary Email: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Secondary Email: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Primary Phone Number: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Secondary Phone Number: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Password: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	Password Confirmation: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	  	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        var el5 = dom.createTextNode("Register");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var element1 = dom.childAt(element0, [21]);
        var morph0 = dom.createMorphAt(element0,1,1);
        var morph1 = dom.createMorphAt(element0,3,3);
        var morph2 = dom.createMorphAt(element0,5,5);
        var morph3 = dom.createMorphAt(element0,7,7);
        var morph4 = dom.createMorphAt(element0,9,9);
        var morph5 = dom.createMorphAt(element0,11,11);
        var morph6 = dom.createMorphAt(element0,13,13);
        var morph7 = dom.createMorphAt(element0,15,15);
        var morph8 = dom.createMorphAt(element0,17,17);
        var morph9 = dom.createMorphAt(element0,19,19);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "firstName")});
        inline(env, morph1, context, "input", [], {"value": get(env, context, "lastName"), "size": "3"});
        inline(env, morph2, context, "input", [], {"value": get(env, context, "contactName")});
        inline(env, morph3, context, "input", [], {"value": get(env, context, "contactInfo")});
        inline(env, morph4, context, "input", [], {"value": get(env, context, "primaryEmail"), "type": "email"});
        inline(env, morph5, context, "input", [], {"value": get(env, context, "secondaryEmail"), "type": "email"});
        inline(env, morph6, context, "input", [], {"value": get(env, context, "primaryPhone")});
        inline(env, morph7, context, "input", [], {"value": get(env, context, "secondaryPhone")});
        inline(env, morph8, context, "input", [], {"value": get(env, context, "password"), "type": "password"});
        inline(env, morph9, context, "input", [], {"value": get(env, context, "passwordConfirm")});
        element(env, element1, context, "action", ["createUser", get(env, context, "primaryEmail")], {});
        return fragment;
      }
    };
  }()));

});
define('client/templates/main-pages/verify-loc', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Verify LOC Certificate");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This information is updated every four hours.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n		Email: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [4]);
        var morph0 = dom.createMorphAt(element0,1,1);
        var morph1 = dom.createMorphAt(element0,3,3);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "firstName")});
        inline(env, morph1, context, "input", [], {"type": "submit", "value": "Verify"});
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/comcast-amherst', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Setting Up Cable and Internet with Comcast (Xfinity)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Free Installation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		When you are ready to set up your service with Comcast, you can get free installation by calling your\n		local Comcast representative. The local representative for the Amherst area is Travis Page. He can be\n		reached at (413) 207-5239. He will set up an appointment to have a Comcast technician install your\n		desired services. Calling Travis Page also allows you access to special bundles or deals that you can only\n		get through your local representative.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("This applies to the following complexes:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Brandywine, Colonial Village, Crestview, Griggs\n				Apartments, Hawkins Meadow, Mill Hollow, Mill Valley Estates, Perry Apartments, Presidential,\n				Puffton Village, Riverside Park Apartments, Rolling Green, South Point, The Boulders,\n				Townhouse, 177 N. Pleasant*†\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Regular Installation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		If you go directly through the Comcast website ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","www.comcast.com");
        var el3 = dom.createTextNode("www.comcast.com");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" or you call 1-800-COMCAST, ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("you will\n		be charged for installation");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". Many of the special deals available through your local representative will\n		not be available to you.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("i");
        var el2 = dom.createTextNode("\n	* If you live at Alpine Commons or Aspen Chase, the Digital Starter set is included in your rent. It will be\n	set up when you arrive. The Digital Starter set includes channels 2 through 80 and high speed internet. If\n	you want to upgrade your service to have more channels, On Demand, or high definition, you must\n	contact 1-800-COMCAST.\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	† If you live at Rolling Green, your living room has a cable outlet as do some of the bedrooms. If you want\n	an outlet installed in a bedroom where one is not currently available, call Travis Page, your local\n	Comcast representative at (413) 207-5239. He will coordinate an appointment with the Rolling Green\n	office to install the new wiring and the Comcast installers to install the appropriate cable box.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/housemate-agreement', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Housemate Agreement");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	This is a legally binding contract among:");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	____________________________________, Housemate 1");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	____________________________________, Housemate 2");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	____________________________________, Housemate 3");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	____________________________________, Housemate 4");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	who are, or anticipate being, housemates at the premises located at:");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	______________________________________________________________________.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PURPOSE");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		1. This agreement is to determine the rights and responsibilities of all those\n			dwelling at this property. Its purpose is to bind them all to the responsibilities set forth herein and to the shares of the costs set forth below.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("AMENDMENTS & CONSIDERATION AMENDMENTS & CONSIDERATION");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		2. The input of all parties is to be considered, and any changes to this document\n		must be done in a written addendum signed by all parties. Consideration is the\n		exchange of promises contained in this agreement and the parties’ agreement\n		to live together and share expenses.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PAYMENT OF RENT PAYMENT OF RENT");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		3. All parties are aware that the property mentioned above has is rented for the\n		amount of $__________ per month, with each party paying the agreed sum of\n		$__________, which is payable according to the period stated in the lease. If\n		housemates are not paying equal amounts of the rent or utilities, their\n		proportional shares are set forth in paragraph 15 below.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n		4. All parties understand that they are all responsible for the lease obligations, and\n		that by law, any one of them may be held responsible for the total bill. The full\n		amount of the rent shall be paid to the landlord when due, as well as any late\n		fees and all costs related to any legal action having to be taken.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \n		Source: UMOCSS.org\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PAYMENT OF UTILITIES PAYMENT OF UTILITIES");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		5. All parties are aware that they are each responsible for a portion of the shared\n		utilities, in addition to the rent amount. These utilities may include electric,\n		water, trash removal, basic phone and basic cable as set forth in the lease for the\n		premises if any.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("a. All bills are to be paid on a timely basis.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("b. Each housemate is responsible for his/her own long distance bills, as well as\n			those of his/her guests, and any special cable bills.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("c. If a shared bill is overdue by more than 30 days, the housemates will decide on\n			an alternate means of payment.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("d. Bills shall be put in the name of the following housemate(s):");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"style","list-style:none;");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Electric:_________________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Heat: __________________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Water:__________________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Cable:__________________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Internet:________________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Other ______________: _________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Other ______________: _________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("Other ______________: _________________________________");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("EARLY TERMINATION OF LEASE EARLY TERMINATION OF LEASE");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		6. If any housemate wishes to be released from their portion of the lease:\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("a. He/she must obtain the landlord’s permission if so required by the lease, and must give _____ days’ notice to the other housemates, and make all\n			reasonable efforts to find an acceptable replacement for their portion of the\n			property. Until a new housemate has been accepted and has signed a new\n			lease with the landlord and this agreement, however, the initial housemate\n			will still be responsible for all rent, utilities, and other charges until the\n			vacancy is filled.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("b. Once a new housemate is identified, it is up to the remaining tenants as to\n			whether or not the replacement is approved within _____ days. Any refusal to\n			accept must be reasonable (i.e. - different sex or a smoker is considered\n			reasonable) and acceptance is not to be unreasonably withheld.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("c. All outstanding charges and debts will be settled before the housemate may\n			be released from his/her obligations under this agreement.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("d. The departing housemate is responsible for resolving all issues related to\n			his/her portion of the security deposit prior to leaving the premises. Each\n			tenant’s signature on this Agreement signifies his/her agreement that any\n			portion of the security deposit that remains with the landlord after the\n			departure of the housemate shall be paid to the remaining housemates unless\n			otherwise agreed in writing between the departing tenant and the landlord.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n		Source: UMOCSS.org\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("DOMESTIC RESPONSIBILITIES DOMESTIC RESPONSIBILITIES");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		7. Housemates will be responsible for their own personal room cleaning and\n		laundry.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		8. The common areas are to be cleaned through a joint effort with responsibilities\n		rotating by week:\n		a. Kitchen\n		b. Bathroom(s)\n		c. Common Living Space\n		d. Yard and/or Trash Removal\n		e. Snow removal\n		Other:_________________________ ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		 The premises will at all times be kept in compliance with local health and safety\n		regulations. The chore rotation shall be as follows: _________________________\n		__________________________________________________________________________\n		__________________________________________________________________________");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n		9. Housemates will also be responsible for their own cooking and food, unless\n		otherwise agreed upon. All housemates shall pay for basic supplies for the\n		apartment, each paying a fair and equal portion.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PETS AND ANIMALS PETS AND ANIMALS");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		10. There will be no pets in the apartment at any time. Should one housemate or\n		their guest bring an animal, that individual will be responsible for all charges\n		and penalties incurred as a result of having the pet.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PARTIES AND NOISE PARTIES AND NOISE");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		11. Parties shall be allowed on weekends, to end at ____ p.m. a.m. (circle one)\n		Roommates agree to comply with all relevant laws if they host a party on the\n		premises and agree to be responsible for all damages caused by them, their\n		guests and invitees and any persons attending the party whether specifically\n		invited or not. If the lease or the town in which the premises are located contain\n		specific limitations on parties or noise, all housemates agree to comply with such\n		by-laws, regulations, or terms. At all times noise levels will be kept within a\n		reasonable volume, with no housemate causing noises deemed excessive\n		through the playing of stereos, televisions, or instruments louder than necessary\n		to hear within the room being played.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("STUDY HOURS STUDY HOURS");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		12. The hours of _____ to _____ Sunday through Thursday are designated as hours\n		for studying. At this time, the property should be quiet and free from\n		distraction.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Source: UMOCSS.org\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("LEASE");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		13. If there is a written lease, all housemates acknowledge that they have received\n		a copy of the lease for the premises and that they all agree to be bound to its\n		terms. Each housemate will comply with all of the lease terms.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("CIRCUMSTANCES NOT COVERED BY THIS CONTRACT, ENFORCEMENT");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		14. Should there be a circumstance encountered by the renters of the property\n		which is not covered by this contract or the lease, the housemates will need to\n		resolve their disagreement in a mature and fair fashion. If the housemates\n		cannot solve the dispute, all parties agree to seek the help of a mediator or an\n		alternative resolution agency. The cost of such alternative dispute resolution\n		(ADR) will also be equally divided between all parties. All parties agree to not\n		resort to emotional, verbal or physical violence and attacks, harassment, and\n		intimidation in order to resolve the conflict. If ADR is not successful in reaching\n		an agreement after a minimum of three sessions, then the conflict may be\n		resolved through court process; jurisdiction will be in Massachusetts in the\n		county where the premises are located.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("PROPORTIONAL SHARES PROPORTIONAL SHARES");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		15. If the housemates are not paying equal shares o 15. f the rent, utilities and other\n		costs of the premises, their proportional shares are set forth as follows:\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		 Rent % Utilities%\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode(" \n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("__________ __________: Housemate 1");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("___________ __________: Housemate 2");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("___________ __________: Housemate 3");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("___________ __________: Housemate 4");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("SECURITY DEPOSIT and LAST MONTH’s RENT SECURITY DEPOSIT and LAST MONTH’s RENT");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		16. The housemates have paid the following amounts for the security deposit and\n		last month’s rent; each shall be entitled to the use or return of his/her\n		proportional share.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Security Deposit Last Month’s Rent\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode(" \n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Housemate 1 __________________ ______________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Housemate 2 __________________ ______________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Housemate 3 __________________ ______________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Housemate 4 __________________ ______________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Source: UMOCSS.org\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("SIGNATURES SIGNATURES");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		We, the tenants of this property, acknowledge our understanding of this\n		contract as well as its terms and conditions, by our signatures below. We agree\n		to be bound by this agreement. We also understand that our complete\n		agreement is contained within this agreement and our lease; no verbal\n		agreements, statements, or understandings are included.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode(" \n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("_________________________________, Housemate 1 Dated: __________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("_________________________________, Housemate 2 Dated: __________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("_________________________________, Housemate 3 Dated: __________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("_________________________________, Housemate 4 Dated: __________________");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/moving-in', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Moving In");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Provided by the Student Legal Services Office");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","printAndEmail");
        var el2 = dom.createTextNode("\n	   	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"src","http://www.umocss.org/Library/images/print_icon_small.gif");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","javascript:window.print()");
        var el4 = dom.createTextNode("Printer-friendly version");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n	    	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"src","http://www.umocss.org/Library/images/mail_icon_small.gif");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","mailto:?subject=UMass Off Campus Student Services - FAQs&body= Click this link or copy and paste it into your web browser to view the UMOCSS FAQs: http://www.umocssdev.org/movingIn. %0D%0A%0D%0A If this email pop up is unfamiliar to you and you prefer to use Yahoo, Gmail, Hotmail, AOL, %0D%0A%0D%0A\n			1) Copy the address link (URL) you see above %0D%0A\n			2) Login to your email account %0D%0A\n			3) Paste the link into a new compose message. %0D%0A %0D%0A\n\n			Otherwise, delete these instructions and send the email.");
        dom.setAttribute(el3,"class","page-tool email");
        var el4 = dom.createTextNode("Send by email");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n		");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n			If your questions are not answered by this summary, you can get further information by looking at Legal Tactics: Tenants’ Rights in Massachusetts at\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.masslegalhelp.org/housing/legal-tactics1");
        var el3 = dom.createTextNode("http://www.masslegalhelp.org/housing/legal-tactics1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". It is very\n			well organized and easily accessed. For further help, please call the Student Legal Services Office (SLSO) at 413\n			545-1995 for free legal advice for UMass students.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			Moving in can be a stressful time, and it may be hard to remember everything you need to think about. Here\n			are some common problems that can arise:\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("u");
        var el5 = dom.createTextNode("The place is really dirty when you arrive.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("TAKE PICTURES.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Call the landlord right away and inform\n					him/her that you can’t move in with the apartment in the condition it is in. Ask him/her to send\n					someone over immediately to clean. If s/he won’t do that, depending on the nature of the dirty\n					conditions, you can let the landlord know that you will clean it yourself and expect to be reimbursed for\n					your time and supplies, or that you can’t stay there and you expect him to find you a place to stay.\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("u");
        var el5 = dom.createTextNode("The previous tenants left some or all their belongings.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode(" TAKE PICTURES.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Call the landlord right away\n					and inform him/her that there are things that were left and s/he needs to send someone over right\n					away to haul it all out. If s/he won’t do that, depending on the nature of the things that were left, you\n					can let the landlord know that you will haul it away yourself and expect to be reimbursed for your time\n					and expenses.\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("u");
        var el5 = dom.createTextNode("There is damage already done in the apartment.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode(" TAKE PICTURES.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" At the beginning of your tenancy,\n					the landlord must give you a document called a Statement of Condition that describes the damages in\n					the apartment at the beginning of the tenancy. You have a right to add your own descriptions of the\n					damage, and the photos will back you up. The landlord can’t charge you or your security deposit for\n					any damage that was already there when you moved in.\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("u");
        var el5 = dom.createTextNode("Everything looks to be in good shape.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("TAKE PICTURES ANYWAY ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" of the walls, floor and ceiling in each\n					room, and hallway then move in and enjoy your new place. Taking pictures is still your best record of\n					how things looked when you moved in – and you never know when they might come in handy at the\n					end of your tenancy if for instance, something that looked minor when you got there has grown into a\n					major issue through no fault of yours.\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n					Don’t forget that the Student Legal Services Office (413 545-1995) is available to help you navigate the\n					beginning of your tenancy if you have any legal issues to talk over.\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/renters-insurance', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Renter's Insurance");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n		");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n			When you rent or lease, your landlord’s insurance usually only protects the building itself — not your personal belongings. If something unfortunate happens, renters insurance helps make sure you can replace your belongings, like your electronics, computers, clothing, furniture, and other valuables. Renters insurance also includes personal liability coverage in case someone is injured while visiting you and you are held liable. If your parents carry a homeowner’s policy, you should check the terms and determine what their policy will cover.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			As a tenant, you can take out a renters insurance policy for about $15 to $30 a month. These policies come in two basic forms:");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("Actual cash-value policies");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" cover the value of the item at the time of loss, taking depreciation into account.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("Replacement-value policies");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" cover the cost of replacing the lost item with a new one. (Replacement-value policies cost more, though both types are subject to the coverage limits. Some items may require extra protection)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Property Insurance");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n		");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n			The items you carry in your backpack alone – a laptop, iPod, cell phone, textbooks and more can easily add up to a thousand or more dollars.  To have to replace them if they are stolen or destroyed could be financially disastrous. Personal property insurance protects students against theft, damage and many other causes of loss to personal property that may occur while you are at school, home, or when you studying abroad.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			Property not covered includes automobiles, motorcycles, or any other type of motorized land vehicles or other conveyances or their accessories (including car stereos, GPS devices, etc.); firearms or ammunition; pharmaceuticals; artwork; antiques and collectibles. Consider purchasing additional coverage for items that may be subject to limitations, such as jewelry, fine art, stamps, furs, and gold.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			Special provisions coverage for bicycles is limited to $500. Insured property in a personally-owned vehicle is covered, provided that the vehicle was locked at the time of theft and there are visible signs of forced entry into the vehicle. Insurance will cover items that are stolen or damaged in a fire, for example.  It does not cover lost items.\n		");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("What to Do");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n		");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n			Decide with your parents which type of coverage is best for you.  It will depend on your eligibility and preferences. Read any policy carefully to find out exactly what is covered and the limits and deductibles that apply.  If you need more coverage, ask whether it can be added at additional cost or at a later date.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			As with any property insurance, you should take inventory of possessions ahead of time in case you need to file a claim. Attach receipts and photos for each item in the inventory and store copies of the inventory at home and at school, in case one gets lost or destroyed. When preparing an inventory for your home, create a section for items away at college.\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("Source");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(": ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.consumerreports.org/cro/2012/08/how-to-insure-your-college-student-s-stuff/index.htm");
        dom.setAttribute(el2,"target","_blank");
        var el3 = dom.createTextNode("consumerreports.org");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/security-deposit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("STUDENTS RIGHTS ADVOCATE ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Published by: UMass Student Legal Services Office FALL 20 I I");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("SECURITY DEPOSITS, A-Z ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("\"First Month's Rent, Last Month's Rent, and Security Deposit Required.\"");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		How often have you seen this phrase in rental advertisements and applications? When you\n		hand over a security deposit to your landlord, do you know what you are paying for and\n		what you need to do to get it back? Do you know what your landlord is required to do\n		with it? Since the security deposit is usually equal to one month's rent, it is a significant\n		amount to lose, and without knowing your rights, you may risk your landlord keeping the\n		security deposit when s/he is not entitled to it. Taking a few easy precautions can ensure\n		that you will get it back with interest.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("WHEN YOU PAY A SECURITY DEPOSIT...");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"style","list-style:none;");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("1.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode("Be sure your landlord deposits it in an escrow account.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Your security deposit does not become your landlord's property when you pay it to him\n			her. The security deposit is ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("your money");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and the landlord can only hold on to it if s/he\n			puts it in an interest bearing escrow account and follows other legal requirements.\n			'Escrow' is a special kind of account that indicates that the landlord is holding someone\n			else's money. The landlord is required to give you a receipt within 30 days that provides you with the name of the bank and the account number where your money is being kept. If your landlord does not properly deposit\n			your security deposit, s/he forfeits his/her right to keep it, and you may be entitled to three times your depositback!\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("2.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Fill out a Statement of Condition.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Within ten days of the start of your tenancy, your landlord is required to give you a Statement of Condition, which	is a separate written document listing all of the problems in the apartment when you move in. The landlord is supposed to make the initial list, but if s/he doesn't, you should make a list yourself. Even if the landlord does make a list, you are entitled to add to it. It is critical to fill this out, so you don't get blamed for damage that exists in the apartment when you move in! At the end of your tenancy, the landlord can't deduct for any damage that is listed on the Statement of Condition, so be sure it is complete. Keep a copy for your records.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("3.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Take pictures.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Even after filling out a Statement of Condition, it is a good idea to take pictures of each room\n			( 4 walls, ceiling & floor) before or at the time you move in. These become your best evidence\n			of the condition of your apartment when you move in. Take a close-up of any damage that\n			exists. Save your photos!\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("4.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Keep your apartment clean enough.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			What is clean enough? It means that you don't let any dirt, grease, stains, or junk accumulate that you will have a	hard time getting rid of later. It is a lot easier to get your security deposit back if you have kept things reasonably	clean as you go. For instance, a spill on a carpet is likely to come clean if you take care of it right away. If it stays in the rug and you walk over it for the next six months before trying to clean it at the end of your tenancy, you are	much more likely to be dealing with a permanent stain, and a landlord who wants to keep your deposit for new carpeting.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("5.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Check your landlord's records.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Your landlord must keep a copy of the Statement of Condition, (as well as records of any damage and/or repairs)\n			and make the records available to you during normal business hours. Ifthe landlord fails to do that, you are entitled to the return of your security deposit. You may want to ask to see your records at some point after the first month or so of tenancy has passed. Take a witness with you. If your landlord doesn't have the records available, make a	note of the date and time you asked to see them, and who was present. Then write your landlord a note describing	your visit and request that s/he return your security deposit plus interest \"pursuant to M.G.L. c.186 §15B (2)(d)i-iii.\"\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("6.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Track the interest you are owed.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			If your landlord keeps your security deposit for one year or more, s/he must pay you interest on it. Make sure that	you receive the interest either annually or at the end of the tenancy. The interest rates are so low these days that it	doesn't amount to much usually, but it is still due to you.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("7.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Do a 'walk through' with your landlord.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			Near the end of your tenancy, ask your landlord to walk through your apartment with you and identify anything that	s/he thinks needs to be cleaned or repaired in order for you to get your security deposit back. Ifs/he identifies	something that is on the Statement of Condition, point that out to him/her. Take notes so that you have a list of	things that the landlord believes are your responsibility.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("8.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Leave your apartment in at least 'broom clean' condition; take pictures again.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			To be most certain of getting your deposit back, leave your apartment spotless. However, the law only requires that	the premises be in 'broom clean' condition, which means the premises need to be empty of your personal property,	swept, and kitchen and baths wiped down. The law says that the landlord can't use your security deposit for dirt or	damage that is 'normal wear and tear' on the unit. If you have lived in your apartment for many years, 'normal wear	and tear' can account for a good deal more than if you only lived there 10 months. When your belongings are out of	the apartment, take pictures again, so you have a record of how you left the place!\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("9.");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("u");
        var el6 = dom.createTextNode(" Make sure you receive the deposit back within 30 days.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			When you leave your apartment, be sure to leave your landlord, in writing, your forwarding address and a request	that s/he return your security deposit. A one-sentence note saying \"Please return my security deposit to me at (your forwarding address)\" will be a big help if you have to make any claims against your landlord later related to your	security deposit. Mark your calendar for thirty days after the end of your tenancy. If your landlord does not send	you your deposit and/or an accounting of your deposit in that period of time, you will have claims against your	landlord for up to three times your deposit back.	Make sure all deductions are properly documented.	If you do receive your deposit back, with interest, within 30 days, then you have successfully navigated your way	through this aspect of your tenancy and you are finished. If, however, your landlord tries to keep any portion of your\n			security deposit, pay very close attention to the paperwork you receive. In order to keep any portion of the deposit, the landlord must:");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"style","list-style:none;");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					a. Send you an itemized list of damages;\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					b. Sign the itemized list of damages \"under the pains and penalties of perjury\" (those words must appear on the page);\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					c. Attach actual invoices, estimates, or receipts for the repairs.\n					If your landlord fails to include any of these things in accounting for your security deposit, then you may be entitled to	three times your security deposit back.\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("	\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("\n	If you are a UMass Amherst student and your landlord does not handle your security deposit correctly, make an\n	appointment to see Attorney Carol Booth at the Student Legal Services Office at 413-545-1995 for\n	free legal assistance!\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/storage-companies', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Self-Storage Companies");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("All College Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n141 N Pleasant St, Amherst ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(888) 676-9930\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Stadium Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n333 Rocky Hill Rd, Hadley ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 549-7739\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Hadley EZ Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n329 Russell St, Hadley ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 586-0715\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Ideal Movers and Storage Inc.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n10 Mill Valley Rd, Hadley ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 584-4746\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Stuff It Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n222 Russell St, Hadley, MA ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 586-5120\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Amherst Self Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n1270 Federal St, Belchertown ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 253-0664\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Sunderland Self Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n5 Clark Mountain Rd Ste A, Sunderland ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 665-7668\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Damon Road Self-Storage");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n106 Damon Rd, Northampton ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n(413) 586-4487 \n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/turning-on-utils', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Turning On Utilities");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2,"width","560");
        dom.setAttribute(el2,"height","315");
        dom.setAttribute(el2,"src","https://www.youtube.com/embed/poBW7aKnR_Q?list=UUMHZVk9tGVeXxg5ZUygXhyA");
        dom.setAttribute(el2,"frameborder","0");
        dom.setAttribute(el2,"allowfullscreen","");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/move-in-out/what-to-pack', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Packing and Moving Checklist");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		If this is your first time moving into a place off campus there are going to be things that come with your new place (like a microwave), things you and your housemates will plan to buy when you get here, and there’ll be things you’ll bring with you. Since many of you have lived on campus, you’ve probably got your bedroom pretty well squared away. As for the rest of the rooms, the best way to\n		plan for your move is to use a good checklist. This one is about as comprehensive as we could think to make it. What’s already in\n		your rental, what you plan to purchase when you get here, what you’re bringing from home, and who’s going to bring it.\n		Your bedroom In the Rental Purchase Here Bring from Home Housemate Responsible\n		Bed/Mattress\n		Bedspread, sheets, blankets, pillow\n		Night stand\n		Lamp\n		Bookcase\n		Curtains, blinds, or shades\n		Alarm Clock\n		Full-length mirror\n		Rugs\n		Kitchen In the Rental Purchase Here Bring from Home Housemate Responsible\n		Silverware (2 sets per housemate)\n		Plates (2 per housemate)\n		Cereal bowls (one per housemate)\n		Cups (2 per housemate)\n		Storage containers\n		Dish rack (for clean dishes)\n		Paper towel holder\n		Spatula\n		Large mixing spoon\n		Pots/pans (1 skillet, 1 lrg. pot, 1 sm. pot)\n		Scissors\n		Sharp knives\n		Table\n		Chairs (at least 2 or 1 per housemate)\n		Microwave\n		Toaster oven or Toaster\n		Large mixing bowl\n		Cutting board\n		Potholders or oven mitts\n		Sandwich bags (also quart and gallon\n		size)\n		Strainer\n		Aluminum foil\n		Sponge or dish cloth\n		Food Processor (for the foodies) \n		Source: UMOCSS.org\n		Bathroom In the Rental Purchase Here Bring from Home Housemate Responsible\n		Towels\n		Wash cloths\n		Toilet paper\n		Toilet bowl cleaner\n		Trash can\n		Shower cleaner\n		Shower curtain\n		Curtain rod\n		Rugs\n		Living Room In the Rental Purchase Here Bring from Home Housemate Responsible\n		Couch/chairs\n		TV\n		TV stand\n		Coffee or Side Tables\n		Desk\n		Miscellaneous In the Rental Purchase Here Bring from Home Housemate Responsible\n		Hand soap (for bathroom and kitchen)\n		Sponges (for bathroom and kitchen)\n		Paper towels\n		Facial tissue\n		Garbage bags\n		Broom and dust pan\n		Vacuum\n		Carpet cleaner (for spills)\n		Disinfectant wipes\n		Glass cleaner\n		Light bulbs\n		Batteries\n		Flashlight\n		Extension cords/power strips\n		Fire extinguisher\n		Laundry soap\n		Hamper/Laundry basket\n		Fans\n		First aid kit\n		Basic tool kit\n		Plunger (to unplug the commode)\n		Smoke detector (see note below)\n		CO2 detector (see note below)\n\n		Note: Your landlord is required to provide these by law. The law is very specific about where these units are located. Some will be\n		battery operated. Test them by pushing the “test” button. They should make a loud screeching noise. If the unit fails to test\n		properly report this to the landlord right away. \n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/my-umocss/home', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/rentals/aptcomplexes', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/rentals/edit-rental', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/rentals/family-housing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/rentals/search-rentals', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/rentals/submit-rental', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/resources/money', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/resources/more', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/resources/moving', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/resources/safety', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('client/templates/the-center/lockers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Locker Rentals");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Lockers are located in the Student Union and the fee is $20 per semester or $30 per academic year. Students must provide their own locks.\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("To rent a locker");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", please come to the Off Campus Student Center. Bring a check payable to UMass Amherst OCSC.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/the-center/printing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Pay-for-Print in the Center");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Students, faculty, and staff can now pay to print documents in the Off Campus Student Center using their UCard! Our printer supports remote printing, so you can print from your personal computer from any on-campus location when on the campus WI-FI.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Don’t have a laptop? The Off Campus Student Center also has two quick access computer stations for you to use. You can use these computers to print documents. \n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Printing is available only in black and white on standard letter paper (8.5 in. x 11 in). Double-sided printing is supported.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		Prices are:\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("$0.05 per single-sided page");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("$0.08 per double-sided page");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://www.oit.umass.edu/support/printing/faq");
        dom.setAttribute(el2,"target","_blank");
        var el3 = dom.createTextNode("More information about printing on campus.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Download and install the Off Campus Student Center Remote Printing Software");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		To install the latest version of the remote printing software, you must be logged in as a LOCAL ADMINISTRATOR (or use the RUN AS. command).\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Download the software:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","http://umaoitptp2.campus.ads.umass.edu/Uniprint/StudentUnionOCSCRemote_for_Lte.exe");
        var el5 = dom.createTextNode("Windows XP / Vista / Windows 7 Systems (32 or 64 bit).");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","http://umaoitptp2.campus.ads.umass.edu/Uniprint/Mac/Generic_BW_Print_Mac_Client.dmg");
        var el5 = dom.createTextNode("MAC Systems (Macintosh 10.5 to 10.7 on PowerPC or Intel processors).");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		See additional download notes in the right hand panel of this page.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		After you've downloaded the software, save the file to your computer and follow the instructions to install the software.\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Send Your Print Job to the Off Campus Student Center Printer");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n		Once you have installed the remote printing software, you can open a file as usual, and then send it to the Off Campus Student Center for printing.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Step 1:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" In most applications, go to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("File > Print");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". A Print window will open.\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("em");
        var el3 = dom.createTextNode("Note: Using Ctrl+P (Windows) or Cmd+P (Mac) to print will send the file to the default printer on your computer (most likely not an OIT remote printer).");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Step 2: ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("In the Print window, select the printer your wish to use:\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Windows, use “BW Printer (Remote)”");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Macintosh, use “BW_Remote_Printer”");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Step 3: ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("The Print Job Details window will open:\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createTextNode("Windows and Macintosh: Enter your ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("OIT Account NetID and password");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" or Guest Card ID for your print job.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Note: You will need to enter this user name again when you pick up your print job at the Learning Commons Print Release Station.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Step 4:");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Click ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Print");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". Your print job will now be stored in the Off Campus Student Center printing queue for up to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("ten (10) hours");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(".\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/the-center/the-staff', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Meet Our Staff");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"style","width: 50%");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tr");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"alt","Mary Lenahan");
        dom.setAttribute(el4,"src","assets/images/mlenahan.jpg");
        dom.setAttribute(el4,"style","width:120px;float:left;");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.setAttribute(el4,"style","width:2%");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Mary Lenahan");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        var el6 = dom.createTextNode("Graduate Assistant");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n		My name is Mary and I am from Cape Cod, MA. During my undergrad, I studied Spanish, Portuguese and International Relations. And for graduate school, I am studying Higher Education.\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		A few things that I have learned about living off-campus are that you should always pay your rent with a check; cash payments are harder to keep track of. Also, to prevent third-degree burns, buy good quality oven mitts.\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" 	end mary ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tr");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"alt","Jillian Toce");
        dom.setAttribute(el4,"src","assets/images/jtoce.jpg");
        dom.setAttribute(el4,"style","float:left;");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Jillian Toce");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        var el6 = dom.createTextNode("Graduate Assistant");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n		I am originally from South Windsor, Connecticut. In May 2013, I graduated from Merrimack College. I earned a Bachelor of Arts in Communication Arts and Sciences with a concentration in Organizational Communication and two minors in Business Administration and Jewish, Christian, Muslim Relations. I am currently pursuing a master's degree in Higher Education Administration.\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		The 2014-2015 academic year is my second year as a Graduate Assistant in the Off Campus Student Center. I love working with off campus students and helping them stay connected to the UMass and Amherst communities!\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" 	end jillian ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tr");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Sally Linowski");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        var el6 = dom.createTextNode("Assistant Dean");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n		Sally grew up on Cape Cod and returns home as often as possible to be near the ocean. She earned a BS in Healthcare Administration from the University of New Hampshire and both a MS and PhD in Public Health from UMass Amherst.\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		In addition to serving as Center Director, Sally leads strategic initiatives to reduce dangerous drinking in our community and manages community partnerships.\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" 	end sally ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tr");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("th");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Thea L. Costine");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        var el6 = dom.createTextNode("Off Campus Student Services Manager");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n		Thea has the main responsibility for the Off Campus Housing search processes, fairs, and website. She creates educational opportunities, publications, and programs for students, parents, and landlords. She is also a direct liaison to area landlords and town officials.\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/templates/the-center/whats-happening', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("What's Happening at the Center?");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("center");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2,"src","https://www.google.com/calendar/embed?mode=AGENDA&height=600&wkst=1&bgcolor=%23FFFFFF&src=aotj1n89ei9p2voe6kruv5u9u0%40group.calendar.google.com&color=%23B1440E&ctz=America%2FNew_York");
        dom.setAttribute(el2,"style","width:75%;height:750px;");
        dom.setAttribute(el2,"frameborder","0");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
define('client/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('client/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('client/tests/controllers/faq/website-help.jshint', function () {

  'use strict';

  module('JSHint - controllers/faq');
  test('controllers/faq/website-help.js should pass jshint', function() { 
    ok(true, 'controllers/faq/website-help.js should pass jshint.'); 
  });

});
define('client/tests/helpers/resolver', ['exports', 'ember/resolver', 'client/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('client/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('client/tests/helpers/start-app', ['exports', 'ember', 'client/app', 'client/router', 'client/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('client/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('client/tests/mirage/config.jshint', function () {

  'use strict';

  module('JSHint - mirage');
  test('mirage/config.js should pass jshint', function() { 
    ok(true, 'mirage/config.js should pass jshint.'); 
  });

});
define('client/tests/mirage/factories/contact.jshint', function () {

  'use strict';

  module('JSHint - mirage/factories');
  test('mirage/factories/contact.js should pass jshint', function() { 
    ok(true, 'mirage/factories/contact.js should pass jshint.'); 
  });

});
define('client/tests/mirage/fixtures/applications.jshint', function () {

  'use strict';

  module('JSHint - mirage/fixtures');
  test('mirage/fixtures/applications.js should pass jshint', function() { 
    ok(true, 'mirage/fixtures/applications.js should pass jshint.'); 
  });

});
define('client/tests/mirage/fixtures/contacts.jshint', function () {

  'use strict';

  module('JSHint - mirage/fixtures');
  test('mirage/fixtures/contacts.js should pass jshint', function() { 
    ok(true, 'mirage/fixtures/contacts.js should pass jshint.'); 
  });

});
define('client/tests/mirage/fixtures/websiteHelps.jshint', function () {

  'use strict';

  module('JSHint - mirage/fixtures');
  test('mirage/fixtures/websiteHelps.js should pass jshint', function() { 
    ok(true, 'mirage/fixtures/websiteHelps.js should pass jshint.'); 
  });

});
define('client/tests/models/application.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/application.js should pass jshint', function() { 
    ok(true, 'models/application.js should pass jshint.'); 
  });

});
define('client/tests/models/contact.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/contact.js should pass jshint', function() { 
    ok(true, 'models/contact.js should pass jshint.'); 
  });

});
define('client/tests/models/register.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/register.js should pass jshint', function() { 
    ok(true, 'models/register.js should pass jshint.'); 
  });

});
define('client/tests/models/website-help.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/website-help.js should pass jshint', function() { 
    ok(true, 'models/website-help.js should pass jshint.'); 
  });

});
define('client/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('client/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('client/tests/routes/faq/international-students.jshint', function () {

  'use strict';

  module('JSHint - routes/faq');
  test('routes/faq/international-students.js should pass jshint', function() { 
    ok(true, 'routes/faq/international-students.js should pass jshint.'); 
  });

});
define('client/tests/routes/faq/landlord.jshint', function () {

  'use strict';

  module('JSHint - routes/faq');
  test('routes/faq/landlord.js should pass jshint', function() { 
    ok(true, 'routes/faq/landlord.js should pass jshint.'); 
  });

});
define('client/tests/routes/faq/student-tenant.jshint', function () {

  'use strict';

  module('JSHint - routes/faq');
  test('routes/faq/student-tenant.js should pass jshint', function() { 
    ok(true, 'routes/faq/student-tenant.js should pass jshint.'); 
  });

});
define('client/tests/routes/faq/website-help.jshint', function () {

  'use strict';

  module('JSHint - routes/faq');
  test('routes/faq/website-help.js should pass jshint', function() { 
    ok(true, 'routes/faq/website-help.js should pass jshint.'); 
  });

});
define('client/tests/routes/footer/ocss-student-jobs.jshint', function () {

  'use strict';

  module('JSHint - routes/footer');
  test('routes/footer/ocss-student-jobs.js should pass jshint', function() { 
    ok(true, 'routes/footer/ocss-student-jobs.js should pass jshint.'); 
  });

});
define('client/tests/routes/footer/recent-scammers.jshint', function () {

  'use strict';

  module('JSHint - routes/footer');
  test('routes/footer/recent-scammers.js should pass jshint', function() { 
    ok(true, 'routes/footer/recent-scammers.js should pass jshint.'); 
  });

});
define('client/tests/routes/footer/service-expectations.jshint', function () {

  'use strict';

  module('JSHint - routes/footer');
  test('routes/footer/service-expectations.js should pass jshint', function() { 
    ok(true, 'routes/footer/service-expectations.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/communicating.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/communicating.js should pass jshint', function() { 
    ok(true, 'routes/housemates/communicating.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/edit-profile.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/edit-profile.js should pass jshint', function() { 
    ok(true, 'routes/housemates/edit-profile.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/getting-to-know.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/getting-to-know.js should pass jshint', function() { 
    ok(true, 'routes/housemates/getting-to-know.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/household-rules.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/household-rules.js should pass jshint', function() { 
    ok(true, 'routes/housemates/household-rules.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/living-with-housemates.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/living-with-housemates.js should pass jshint', function() { 
    ok(true, 'routes/housemates/living-with-housemates.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/managing-money.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/managing-money.js should pass jshint', function() { 
    ok(true, 'routes/housemates/managing-money.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/resolving-conflicts.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/resolving-conflicts.js should pass jshint', function() { 
    ok(true, 'routes/housemates/resolving-conflicts.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/search-profiles.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/search-profiles.js should pass jshint', function() { 
    ok(true, 'routes/housemates/search-profiles.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/submit-profile.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/submit-profile.js should pass jshint', function() { 
    ok(true, 'routes/housemates/submit-profile.js should pass jshint.'); 
  });

});
define('client/tests/routes/housemates/talking-about-money.jshint', function () {

  'use strict';

  module('JSHint - routes/housemates');
  test('routes/housemates/talking-about-money.js should pass jshint', function() { 
    ok(true, 'routes/housemates/talking-about-money.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/emergency-prep.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/emergency-prep.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/emergency-prep.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/fire-safety.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/fire-safety.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/fire-safety.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/go-green.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/go-green.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/go-green.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/insurance.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/insurance.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/insurance.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/personal-safety.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/personal-safety.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/personal-safety.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/prep-for-breaks.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/prep-for-breaks.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/prep-for-breaks.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/town-bylaws.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/town-bylaws.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/town-bylaws.js should pass jshint.'); 
  });

});
define('client/tests/routes/living-off-campus/winter-readiness.jshint', function () {

  'use strict';

  module('JSHint - routes/living-off-campus');
  test('routes/living-off-campus/winter-readiness.js should pass jshint', function() { 
    ok(true, 'routes/living-off-campus/winter-readiness.js should pass jshint.'); 
  });

});
define('client/tests/routes/main-pages/contact.jshint', function () {

  'use strict';

  module('JSHint - routes/main-pages');
  test('routes/main-pages/contact.js should pass jshint', function() { 
    ok(true, 'routes/main-pages/contact.js should pass jshint.'); 
  });

});
define('client/tests/routes/main-pages/ocrm.jshint', function () {

  'use strict';

  module('JSHint - routes/main-pages');
  test('routes/main-pages/ocrm.js should pass jshint', function() { 
    ok(true, 'routes/main-pages/ocrm.js should pass jshint.'); 
  });

});
define('client/tests/routes/main-pages/register.jshint', function () {

  'use strict';

  module('JSHint - routes/main-pages');
  test('routes/main-pages/register.js should pass jshint', function() { 
    ok(false, 'routes/main-pages/register.js should pass jshint.\nroutes/main-pages/register.js: line 6, col 34, \'password\' is defined but never used.\n\n1 error'); 
  });

});
define('client/tests/routes/main-pages/verify-loc.jshint', function () {

  'use strict';

  module('JSHint - routes/main-pages');
  test('routes/main-pages/verify-loc.js should pass jshint', function() { 
    ok(true, 'routes/main-pages/verify-loc.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/comcast-amherst.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/comcast-amherst.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/comcast-amherst.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/housemate-agreement.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/housemate-agreement.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/housemate-agreement.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/moving-in.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/moving-in.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/moving-in.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/renters-insurance.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/renters-insurance.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/renters-insurance.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/security-deposit.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/security-deposit.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/security-deposit.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/storage-companies.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/storage-companies.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/storage-companies.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/turning-on-utils.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/turning-on-utils.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/turning-on-utils.js should pass jshint.'); 
  });

});
define('client/tests/routes/move-in-out/what-to-pack.jshint', function () {

  'use strict';

  module('JSHint - routes/move-in-out');
  test('routes/move-in-out/what-to-pack.js should pass jshint', function() { 
    ok(true, 'routes/move-in-out/what-to-pack.js should pass jshint.'); 
  });

});
define('client/tests/routes/my-umocss/home.jshint', function () {

  'use strict';

  module('JSHint - routes/my-umocss');
  test('routes/my-umocss/home.js should pass jshint', function() { 
    ok(true, 'routes/my-umocss/home.js should pass jshint.'); 
  });

});
define('client/tests/routes/rentals/aptcomplexes.jshint', function () {

  'use strict';

  module('JSHint - routes/rentals');
  test('routes/rentals/aptcomplexes.js should pass jshint', function() { 
    ok(true, 'routes/rentals/aptcomplexes.js should pass jshint.'); 
  });

});
define('client/tests/routes/rentals/edit-rental.jshint', function () {

  'use strict';

  module('JSHint - routes/rentals');
  test('routes/rentals/edit-rental.js should pass jshint', function() { 
    ok(true, 'routes/rentals/edit-rental.js should pass jshint.'); 
  });

});
define('client/tests/routes/rentals/family-housing.jshint', function () {

  'use strict';

  module('JSHint - routes/rentals');
  test('routes/rentals/family-housing.js should pass jshint', function() { 
    ok(true, 'routes/rentals/family-housing.js should pass jshint.'); 
  });

});
define('client/tests/routes/rentals/search-rentals.jshint', function () {

  'use strict';

  module('JSHint - routes/rentals');
  test('routes/rentals/search-rentals.js should pass jshint', function() { 
    ok(true, 'routes/rentals/search-rentals.js should pass jshint.'); 
  });

});
define('client/tests/routes/rentals/submit-rental.jshint', function () {

  'use strict';

  module('JSHint - routes/rentals');
  test('routes/rentals/submit-rental.js should pass jshint', function() { 
    ok(true, 'routes/rentals/submit-rental.js should pass jshint.'); 
  });

});
define('client/tests/routes/resources/money.jshint', function () {

  'use strict';

  module('JSHint - routes/resources');
  test('routes/resources/money.js should pass jshint', function() { 
    ok(true, 'routes/resources/money.js should pass jshint.'); 
  });

});
define('client/tests/routes/resources/more.jshint', function () {

  'use strict';

  module('JSHint - routes/resources');
  test('routes/resources/more.js should pass jshint', function() { 
    ok(true, 'routes/resources/more.js should pass jshint.'); 
  });

});
define('client/tests/routes/resources/moving.jshint', function () {

  'use strict';

  module('JSHint - routes/resources');
  test('routes/resources/moving.js should pass jshint', function() { 
    ok(true, 'routes/resources/moving.js should pass jshint.'); 
  });

});
define('client/tests/routes/resources/safety.jshint', function () {

  'use strict';

  module('JSHint - routes/resources');
  test('routes/resources/safety.js should pass jshint', function() { 
    ok(true, 'routes/resources/safety.js should pass jshint.'); 
  });

});
define('client/tests/routes/the-center/lockers.jshint', function () {

  'use strict';

  module('JSHint - routes/the-center');
  test('routes/the-center/lockers.js should pass jshint', function() { 
    ok(true, 'routes/the-center/lockers.js should pass jshint.'); 
  });

});
define('client/tests/routes/the-center/printing.jshint', function () {

  'use strict';

  module('JSHint - routes/the-center');
  test('routes/the-center/printing.js should pass jshint', function() { 
    ok(true, 'routes/the-center/printing.js should pass jshint.'); 
  });

});
define('client/tests/routes/the-center/the-staff.jshint', function () {

  'use strict';

  module('JSHint - routes/the-center');
  test('routes/the-center/the-staff.js should pass jshint', function() { 
    ok(true, 'routes/the-center/the-staff.js should pass jshint.'); 
  });

});
define('client/tests/routes/the-center/whats-happening.jshint', function () {

  'use strict';

  module('JSHint - routes/the-center');
  test('routes/the-center/whats-happening.js should pass jshint', function() { 
    ok(true, 'routes/the-center/whats-happening.js should pass jshint.'); 
  });

});
define('client/tests/test-helper', ['client/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('client/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('client/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/application-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/controllers/faq/website-help-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:faq/website-help', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/controllers/faq/website-help-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers/faq');
  test('unit/controllers/faq/website-help-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/faq/website-help-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/models/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('application', 'Unit | Model | application', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('client/tests/unit/models/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/application-test.js should pass jshint', function() { 
    ok(true, 'unit/models/application-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/models/faq/website-help-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('faq/website-help', 'Unit | Model | faq/website help', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('client/tests/unit/models/faq/website-help-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models/faq');
  test('unit/models/faq/website-help-test.js should pass jshint', function() { 
    ok(true, 'unit/models/faq/website-help-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:contact', 'Unit | Route | contact', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/contact-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/contact-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/faq/international-students-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:faq/international-students', 'Unit | Route | faq/international students', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/faq/international-students-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/faq');
  test('unit/routes/faq/international-students-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/faq/international-students-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/faq/landlord-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:faq/landlord', 'Unit | Route | faq/landlord', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/faq/landlord-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/faq');
  test('unit/routes/faq/landlord-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/faq/landlord-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/faq/student-tenant-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:faq/student-tenant', 'Unit | Route | faq/student tenant', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/faq/student-tenant-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/faq');
  test('unit/routes/faq/student-tenant-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/faq/student-tenant-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/faq/website-help-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:faq/website-help', 'Unit | Route | faq/website help', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/faq/website-help-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/faq');
  test('unit/routes/faq/website-help-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/faq/website-help-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/footer/ocss-student-jobs-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:footer/ocss-student-jobs', 'Unit | Route | footer/ocss student jobs', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/footer/ocss-student-jobs-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/footer');
  test('unit/routes/footer/ocss-student-jobs-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/footer/ocss-student-jobs-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/footer/recent-scammers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:footer/recent-scammers', 'Unit | Route | footer/recent scammers', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/footer/recent-scammers-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/footer');
  test('unit/routes/footer/recent-scammers-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/footer/recent-scammers-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/footer/service-expectations-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:footer/service-expectations', 'Unit | Route | footer/service expectations', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/footer/service-expectations-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/footer');
  test('unit/routes/footer/service-expectations-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/footer/service-expectations-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/communicating-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/communicating', 'Unit | Route | housemates/communicating', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/communicating-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/communicating-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/communicating-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/edit-profile-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/edit-profile', 'Unit | Route | housemates/edit profile', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/edit-profile-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/edit-profile-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/edit-profile-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/getting-to-know-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/getting-to-know', 'Unit | Route | housemates/getting to know', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/getting-to-know-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/getting-to-know-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/getting-to-know-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/household-rules-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/household-rules', 'Unit | Route | housemates/household rules', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/household-rules-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/household-rules-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/household-rules-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/living-with-housemates-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/living-with-housemates', 'Unit | Route | housemates/living with housemates', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/living-with-housemates-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/living-with-housemates-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/living-with-housemates-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/managing-money-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/managing-money', 'Unit | Route | housemates/managing money', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/managing-money-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/managing-money-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/managing-money-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/resolving-conflicts-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/resolving-conflicts', 'Unit | Route | housemates/resolving conflicts', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/resolving-conflicts-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/resolving-conflicts-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/resolving-conflicts-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/search-profiles-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/search-profiles', 'Unit | Route | housemates/search profiles', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/search-profiles-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/search-profiles-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/search-profiles-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/submit-profile-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/submit-profile', 'Unit | Route | housemates/submit profile', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/submit-profile-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/submit-profile-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/submit-profile-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/housemates/talking-about-money-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:housemates/talking-about-money', 'Unit | Route | housemates/talking about money', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/housemates/talking-about-money-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/housemates');
  test('unit/routes/housemates/talking-about-money-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/housemates/talking-about-money-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:main-pages/home', 'Unit | Route | main pages/home', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/emergency-prep-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/emergency-prep', 'Unit | Route | living off campus/emergency prep', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/emergency-prep-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/emergency-prep-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/emergency-prep-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/fire-safety-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/fire-safety', 'Unit | Route | living off campus/fire safety', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/fire-safety-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/fire-safety-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/fire-safety-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/go-green-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/go-green', 'Unit | Route | living off campus/go green', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/go-green-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/go-green-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/go-green-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/insurance-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/insurance', 'Unit | Route | living off campus/insurance', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/insurance-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/insurance-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/insurance-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/personal-safety-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/personal-safety', 'Unit | Route | living off campus/personal safety', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/personal-safety-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/personal-safety-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/personal-safety-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/prep-for-breaks-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/prep-for-breaks', 'Unit | Route | living off campus/prep for breaks', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/prep-for-breaks-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/prep-for-breaks-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/prep-for-breaks-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/town-bylaws-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/town-bylaws', 'Unit | Route | living off campus/town bylaws', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/town-bylaws-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/town-bylaws-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/town-bylaws-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/living-off-campus/winter-readiness-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:living-off-campus/winter-readiness', 'Unit | Route | living off campus/winter readiness', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/living-off-campus/winter-readiness-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/living-off-campus');
  test('unit/routes/living-off-campus/winter-readiness-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/living-off-campus/winter-readiness-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/main-pages/contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:main-pages/contact', 'Unit | Route | main pages/contact', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/main-pages/contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/main-pages');
  test('unit/routes/main-pages/contact-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/main-pages/contact-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/main-pages/ocrm-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:main-pages/ocrm', 'Unit | Route | main pages/ocrm', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/main-pages/ocrm-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/main-pages');
  test('unit/routes/main-pages/ocrm-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/main-pages/ocrm-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/main-pages/register-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:main-pages/register', 'Unit | Route | main pages/register', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/main-pages/register-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/main-pages');
  test('unit/routes/main-pages/register-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/main-pages/register-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/main-pages/verify-loc-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:main-pages/verify-loc', 'Unit | Route | main pages/verify loc', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/main-pages/verify-loc-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/main-pages');
  test('unit/routes/main-pages/verify-loc-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/main-pages/verify-loc-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/baz-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/baz', 'Unit | Route | move in out/baz', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/baz-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/baz-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/baz-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/comcast-amherst-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/comcast-amherst', 'Unit | Route | move in out/comcast amherst', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/comcast-amherst-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/comcast-amherst-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/comcast-amherst-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/housemate-agreement-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/housemate-agreement', 'Unit | Route | move in out/housemate agreement', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/housemate-agreement-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/housemate-agreement-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/housemate-agreement-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/moving-in-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/moving-in', 'Unit | Route | move in out/moving in', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/moving-in-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/moving-in-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/moving-in-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/renters-insurance-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/renters-insurance', 'Unit | Route | move in out/renters insurance', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/renters-insurance-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/renters-insurance-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/renters-insurance-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/security-deposit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/security-deposit', 'Unit | Route | move in out/security deposit', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/security-deposit-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/security-deposit-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/security-deposit-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/storage-companies-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/storage-companies', 'Unit | Route | move in out/storage companies', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/storage-companies-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/storage-companies-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/storage-companies-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/turning-on-utils-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/turning-on-utils', 'Unit | Route | move in out/turning on utils', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/turning-on-utils-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/turning-on-utils-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/turning-on-utils-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/move-in-out/what-to-pack-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:move-in-out/what-to-pack', 'Unit | Route | move in out/what to pack', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/move-in-out/what-to-pack-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/move-in-out');
  test('unit/routes/move-in-out/what-to-pack-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/move-in-out/what-to-pack-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/my-umocss/home-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:my-umocss/home', 'Unit | Route | my umocss/home', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/my-umocss/home-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/my-umocss');
  test('unit/routes/my-umocss/home-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/my-umocss/home-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/rentals/aptcomplexes-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:renatls/aptcomplexes', 'Unit | Route | renatls/aptcomplexes', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/rentals/aptcomplexes-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/rentals');
  test('unit/routes/rentals/aptcomplexes-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rentals/aptcomplexes-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/rentals/edit-rental-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:renatls/edit-rental', 'Unit | Route | renatls/edit rental', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/rentals/edit-rental-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/rentals');
  test('unit/routes/rentals/edit-rental-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rentals/edit-rental-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/rentals/family-housing-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:renatls/family-housing', 'Unit | Route | renatls/family housing', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/rentals/family-housing-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/rentals');
  test('unit/routes/rentals/family-housing-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rentals/family-housing-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/rentals/search-rentals-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:renatls/search-rentals', 'Unit | Route | renatls/search rentals', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/rentals/search-rentals-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/rentals');
  test('unit/routes/rentals/search-rentals-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rentals/search-rentals-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/rentals/submit-rental-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:renatls/submit-rental', 'Unit | Route | renatls/submit rental', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/rentals/submit-rental-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/rentals');
  test('unit/routes/rentals/submit-rental-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rentals/submit-rental-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/resources/money-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:resources/money', 'Unit | Route | resources/money', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/resources/money-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/resources');
  test('unit/routes/resources/money-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/resources/money-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/resources/more-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:resources/more', 'Unit | Route | resources/more', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/resources/more-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/resources');
  test('unit/routes/resources/more-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/resources/more-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/resources/moving-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:resources/moving', 'Unit | Route | resources/moving', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/resources/moving-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/resources');
  test('unit/routes/resources/moving-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/resources/moving-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/resources/safety-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:resources/safety', 'Unit | Route | resources/safety', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/resources/safety-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/resources');
  test('unit/routes/resources/safety-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/resources/safety-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/the-center/lockers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:the-center/lockers', 'Unit | Route | the center/lockers', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/the-center/lockers-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/the-center');
  test('unit/routes/the-center/lockers-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/the-center/lockers-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/the-center/printing-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:the-center/printing', 'Unit | Route | the center/printing', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/the-center/printing-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/the-center');
  test('unit/routes/the-center/printing-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/the-center/printing-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/the-center/the-staff-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:the-center/the-staff', 'Unit | Route | the center/the staff', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/the-center/the-staff-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/the-center');
  test('unit/routes/the-center/the-staff-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/the-center/the-staff-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/routes/the-center/whats-happening-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:the-center/whats-happening', 'Unit | Route | the center/whats happening', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('client/tests/unit/routes/the-center/whats-happening-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes/the-center');
  test('unit/routes/the-center/whats-happening-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/the-center/whats-happening-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('client/config/environment', ['ember'], function(Ember) {
  var prefix = 'client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("client/tests/test-helper");
} else {
  require("client/app")["default"].create({"name":"client","version":"0.0.0.0564641a"});
}

/* jshint ignore:end */
//# sourceMappingURL=client.map