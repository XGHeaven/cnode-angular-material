import cnode from '../cnode'
import angular from 'angular'

cnode.controller('UserController',ƒ(($scope, $state, User, API) => {
	let name = $state.params.name = $state.params.name || User.user.loginname;

	API.getUser(name).success(data => {
		angular.extend($scope, data.data)
	})
}))