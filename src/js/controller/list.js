import cnode from '../cnode'
import angular from 'angular'

cnode.controller('ListController', ['$scope', '$mdDialog', '$state', 'API', '$mdMedia', ($scope, $mdDialog, $state, API, $mdMedia) => {
	const tab = $state.params.tab || 'all'
	
	$scope.gotoTopic = id => {
		$state.go('main.topic', {id})
	}
	
	API.getTopics(tab).success(data => {
		$scope.items = data.data
	})
	
	$scope.showTopic = (e,id) => {
		if (!$mdMedia('gt-md')) {
			return $scope.gotoTopic(id)
		}
		$mdDialog.show({
			controller: 'TopicDialogController',
			templateUrl: 'view/dialog/detail.html',
			parent: angular.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true,
			locals: {
				TopicID: id
			}
		}).then(answer => {
			
		}, () => {
			
		})
	}
}])