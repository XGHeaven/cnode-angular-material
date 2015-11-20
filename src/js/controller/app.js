import cnode from '../cnode'

cnode.controller('RootController', ['$rootScope', '$mdSidenav', ($rootScope, $mdSidenav) => {
	$rootScope.toggleSider = () => {
		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}
}])