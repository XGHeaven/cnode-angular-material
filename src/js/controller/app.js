import cnode from '../cnode'

cnode.controller('RootController', ƒ(($rootScope, $mdSidenav, User, $mdMedia, Message, Event) => {
	// instance message

	$rootScope.toggleSider = () => {
		if ($mdMedia('gt-md')) { return }

		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}

	$rootScope.logout = () => {
		Event.$emit('logout')
	}

	$rootScope.event = Event
}))