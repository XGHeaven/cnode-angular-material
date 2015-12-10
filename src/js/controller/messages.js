import cnode from '../cnode'

cnode.controller('MessagesController', ƒ(($scope, API, Message) => {
	// check
	Message.check()

	$scope.markAll = () => {
		API.postMarkAll()
	}
}))