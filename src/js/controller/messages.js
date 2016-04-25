import cnode from '../cnode'

cnode.controller('MessagesController', ($scope, API, Message) => {
	// check
	Message.check()

	$scope.markAll = () => {
		API.postMarkAll().then(res => {
			Message.has_read_messages.unshift(...Message.hasnot_read_messages)
			Message.hasnot_read_messages.length = 0
		})
	}
})
