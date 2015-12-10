import cnode from '../cnode'

cnode.controller('RootController', ƒ(($rootScope, $mdSidenav, User, $mdMedia, Message) => {
	$rootScope.toggleSider = () => {
		if ($mdMedia('gt-md')) { return }

		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}

	$rootScope.logout = () => {
		User.clear()
	}

	Message.check()
}))