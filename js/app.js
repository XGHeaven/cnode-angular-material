(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cnode = _angular2.default.module('cnode', ['ui.router', 'ngMaterial', 'ngSanitize']);

exports.default = cnode;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

	// $locationProvider.html5Mode(true)

	$urlRouterProvider.otherwise('/main/list/all');

	$stateProvider.state('main', {
		url: '/main',
		absolute: true,
		views: {
			sider: {
				templateUrl: 'view/sider.html',
				controller: 'SiderController'
			},
			main: {
				templateUrl: 'view/main.html',
				controller: 'MainController'
			}
		}
	}).state('main.list', {
		url: '/list',
		abstract: true,
		template: '<div ui-view></div>'
	}).state('main.list.all', {
		url: '/{tab:all|good|share|ask|job}',
		templateUrl: 'view/list.html',
		controller: 'ListController'
	});
}]);

},{"../cnode":2}],4:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.controller('RootController', ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
	$rootScope.toggleSider = function () {
		$mdSidenav('sider').toggle().then(function () {}).catch(function () {});
	};
}]);

},{"../cnode":2}],5:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.controller('TopicDialogController', ['$scope', '$mdDialog', 'API', 'TopicID', function ($scope, $mdDialog, API, id) {
	API.getTopic(id).success(function (data) {
		Object.assign($scope, data.data);
	});

	$scope.close = function () {
		$mdDialog.hide();
	};
}]);

},{"../cnode":2}],6:[function(require,module,exports){
(function (global){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

var _angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.controller('ListController', ['$scope', '$mdDialog', '$state', 'API', function ($scope, $mdDialog, $state, API) {
	var tab = $state.params.tab || 'all';

	API.getTopics(tab).success(function (data) {
		$scope.items = data.data;
	});

	$scope.showTopic = function (e, id) {
		$mdDialog.show({
			controller: 'TopicDialogController',
			templateUrl: 'view/dialog/detail.html',
			parent: _angular2.default.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true,
			locals: {
				TopicID: id
			}
		}).then(function (answer) {}, function () {});
	};
}]);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../cnode":2}],7:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.controller('MainController', ['$scope', function ($scope) {
	$scope;
}]);

},{"../cnode":2}],8:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.controller('SiderController', ['$scope', function ($scope) {
	$scope.navs = [{
		title: '全部',
		tab: 'all'
	}, {
		title: '精华',
		tab: 'good'
	}, {
		title: '分享',
		tab: 'share'
	}, {
		title: '问答',
		tab: 'ask'
	}, {
		title: '招聘',
		tab: 'job'
	}];
}]);

},{"../cnode":2}],9:[function(require,module,exports){
'use strict';

var _cnode = require('../cnode');

var _cnode2 = _interopRequireDefault(_cnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cnode2.default.factory('API', ['$http', '$q', function ($http, $q) {
	var url = 'https://cnodejs.org/api/v1';

	function getTopics() {
		var tab = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

		return $http.get(url + '/topics', {
			params: {
				tab: tab
			}
		});
	}

	function getTopic(id) {
		return $http.get(url + '/topic/' + id);
	}

	return {
		getTopics: getTopics,
		getTopic: getTopic
	};
}]);

},{"../cnode":2}],10:[function(require,module,exports){
'use strict';

var _cnode = require('./cnode');

var _cnode2 = _interopRequireDefault(_cnode);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(dir) {
	var files = _fs2.default.readdirSync(dir);

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var file = _step.value;

			_cnode2.default[dir](require('./' + dir + '/' + file));
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}

require('./config/router.js');require('./controller/app.js');require('./controller/dialog.js');require('./controller/list.js');require('./controller/main.js');require('./controller/sider.js');require('./factory/api.js');

},{"./cnode":2,"./config/router.js":3,"./controller/app.js":4,"./controller/dialog.js":5,"./controller/list.js":6,"./controller/main.js":7,"./controller/sider.js":8,"./factory/api.js":9,"fs":1}]},{},[10])