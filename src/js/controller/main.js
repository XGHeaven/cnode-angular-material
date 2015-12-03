import cnode from '../cnode'

cnode.controller('MainController', ['$scope', ($scope) => {
	// set title
	$scope.$on('TopicTitle', (e, title) => $scope.mainTitle = title)
	// when router changed, reset title
	$scope.$on('$stateChangeStart', (e) => $scope.mainTitle = '')
}])