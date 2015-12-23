import cnode from '../cnode'

cnode.controller('RootController', ƒ(($rootScope, $mdSidenav, $mdMedia, Message, Event, Msgbox) => {
	// instance message
	console.log($mdMedia)

	$rootScope.toggleSider = () => {
		if ($mdMedia('md')) { return }

		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}

	$rootScope.logout = () => {
		Msgbox.confirm('真的要退出么？').then(() => {
			Event.$emit('logout')
		}).catch(() => {
			Msgbox.alert('感谢您的不杀之恩~~~')
		})
	}

	$rootScope.event = Event
}))