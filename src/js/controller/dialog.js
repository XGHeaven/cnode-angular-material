import cnode from '../cnode'
import angular from 'angular'

cnode.controller('TopicDialogController', ['$scope', '$mdDialog', 'API', 'TopicID', '$state', ($scope, $mdDialog, API, id, $state) => {
	$scope.gotoTopic = () => {
		$state.go('main.topic', {id})
		$scope.close()
	}

	$scope.id = id

	$scope.$on('TopicTitle', (e, title) => $scope.title = title)
	
	// API.getTopic(id).success(data => {
	// 	data.data.content = md.render(data.data.content)
		
	// 	data.data.replies.forEach(reply => {
	// 		reply.content = md.render(reply.content)
	// 	})
		
	// 	angular.extend($scope, data.data)
	// })
	
	$scope.close = () => {
		$mdDialog.hide()
	}
}])