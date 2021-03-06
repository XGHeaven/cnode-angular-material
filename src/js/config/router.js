import cnode from '../cnode'

cnode.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

	// $locationProvider.html5Mode(true)

	$urlRouterProvider.otherwise('/main/list/all')

	$stateProvider
	.state('main', {
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
	})
	// .state('main.list', {
	// 	url: '/list',
	// 	abstract: true,
	// 	template: '<div ui-view></div>'
	// })
	.state('main.list', {
		url: '/list/{tab:all|good|share|ask|job}',
		templateUrl: 'view/list.html',
		controller: 'ListController'
	})
	.state('main.topic', {
		url: '/topic/:id',
		templateUrl: 'view/topic.html',
		controller: 'TopicController'
	})
	.state('main.create', {
		url: '/create',
		templateUrl: 'view/create.html',
		controller: 'CreateController'
	})
	.state('main.about', {
		url: '/about',
		templateUrl: 'view/about.html',
		controller: 'AboutController'
	})
	.state('main.setting', {
		url: '/setting',
		templateUrl: 'view/setting.html',
		controller: 'SettingController'
	})
	.state('main.messages', {
		url: '/messages',
		templateUrl: 'view/messages.html',
		controller: 'MessagesController'
	})
	.state('main.user', {
		url: '/user/:name',
		templateUrl: 'view/user.html',
		controller: 'UserController'
	})
	.state('main.collection', {
		url: '/collection/:name',
		templateUrl: 'view/collection.html',
		controller: 'CollectionController'
	})
})
