import cnode from '../cnode'

cnode.controller('CreateController', ƒ(($scope, tabName, API, $state) => {
	$scope.tabs = [...tabName].filter(tab => tab[0] !== 'unknow' && tab[0] !== 'top' && tab[0] !== 'good')

	$scope.preview = false
	$scope.togglePreview = () => $scope.preview = !$scope.preview

	$scope.submit = () => {
		API.postTopic({
			tab: $scope.tab,
			title: $scope.title,
			content: $scope.content
		}).then(data => {
			$state.go('main.list.all', {tab: 'all'})
		})
	}
}))