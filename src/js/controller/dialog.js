import cnode from '../cnode'
import angular from 'angular'

cnode.controller('TopicDialogController', ($scope, $mdDialog, API, TopicID, $state) => {
	// for convinence
	let id = TopicID

	$scope.gotoTopic = () => {
		$state.go('main.topic', {id})
	}

	$scope.id = id

	$scope.$on('TopicTitle', (e, title) => $scope.title = title)

	// when change state, auto close this dialog
	$scope.$on('$stateChangeStart', e => {
		$scope.close()
	})

	$scope.close = () => {
		$mdDialog.hide()
	}
})
