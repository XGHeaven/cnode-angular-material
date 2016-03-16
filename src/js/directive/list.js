import cnode from '../cnode'

cnode.directive('cnList', [function() {
	return {
		restrict: 'E',
		templateUrl: 'view/component/list.html',
		replace: true,
		scope: {
			open: '=cnOpen',
			load: '=cnLoad',
			// 是否允许显示加载更多
			loadDisable: '=cnLoadDisable'
		},
		controller: ƒ(($scope) => {
			$scope.pages = [];

			$scope.loadMore = () => {
				$scope.loading = true;
				$scope.load($scope.pages.length + 1).then(data => {
					$scope.pages.push(data);
				}).finally(() => {
					$scope.loading = false;
				})
			}

			$scope.load(1).then(data => $scope.pages.push(data))
		})
	}
}])