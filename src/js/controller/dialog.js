import cnode from '../cnode'

cnode.controller('TopicDialogController', ['$scope', '$mdDialog', 'API', 'TopicID', ($scope, $mdDialog, API, id) => {
	API.getTopic(id).success(data => {
		Object.assign($scope, data.data)
	})
	
	$scope.close = () => {
		$mdDialog.hide()
	}
}])