import cnode from '../cnode'

cnode.controller('CreateController', ƒ(($scope, tabName, API, $state) => {
	$scope.tabs = [...tabName].filter(tab => tab[0] !== 'unknow' && tab[0] !== 'top' && tab[0] !== 'good')

	$scope.preview = false
	$scope.togglePreview = () => $scope.preview = !$scope.preview

	$scope.submit = () => {
		API.postTopic($scope.tab, $scope.title, $scope.content).then(data => {
			$state.go('main.list', {tab: 'all'})
		})
	}
}))