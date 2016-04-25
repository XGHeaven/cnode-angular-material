import cnode from '../cnode'

cnode.controller('MainController', ($scope, $state) => {
	// set title
	$scope.$on('TopicTitle', (e, title) => $scope.mainTitle = title)
	// when router changed, reset title
	$scope.$on('$stateChangeStart', (e) => $scope.mainTitle = '')

	$scope.refresh = ::$state.reload
})
