import cnode from '../cnode'

cnode.directive('cnList', [function() {
	return {
		restrict: 'E',
		templateUrl: 'view/component/list.html',
		replace: true,
		scope: {
			pages: '=cnPages',
			open: '=cnOpen',
			loadMore: '=cnLoad'
		}
	}
}])