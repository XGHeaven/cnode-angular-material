import cnode from '../cnode'
import md from '../utils/md'

cnode.controller('TopicDialogController', ['$scope', '$mdDialog', 'API', 'TopicID', '$state', ($scope, $mdDialog, API, id, $state) => {
	$scope.gotoTopic = () => {
		$state.go('main.topic', {id})
		$scope.close()
	}
	
	API.getTopic(id).success(data => {
		data.data.content = md.render(data.data.content)
		
		data.data.replies.forEach(reply => {
			reply.content = md.render(reply.content)
		})
		
		Object.assign($scope, data.data)
	})
	
	$scope.close = () => {
		$mdDialog.hide()
	}
}])