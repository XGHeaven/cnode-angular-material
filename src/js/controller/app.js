import cnode from '../cnode'

cnode.controller('RootController', ['$rootScope', '$mdSidenav', 'User', ($rootScope, $mdSidenav, User) => {
	$rootScope.toggleSider = () => {
		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}

	$rootScope.logout = () => {
		User.clear()
	}
}])