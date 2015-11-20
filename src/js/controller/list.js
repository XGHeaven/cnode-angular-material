import cnode from '../cnode'
import angular from 'angular'

cnode.controller('ListController', ['$scope', '$mdDialog', '$state', 'API', ($scope, $mdDialog, $state, API) => {
	const tab = $state.params.tab || 'all'
	
	API.getTopics(tab).success(data => {
		$scope.items = data.data
	})
	
	$scope.showTopic = (e,id) => {
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