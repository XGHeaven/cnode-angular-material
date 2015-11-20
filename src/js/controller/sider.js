import cnode from '../cnode'

cnode.controller('SiderController', ['$scope', ($scope) => {
	$scope.navs = [{
		title: '全部',
		tab: 'all'
	}, {
		title: '精华',
		tab: 'good'
	}, {
		title: '分享',
		tab: 'share'
	}, {
		title: '问答',
		tab: 'ask'
	}, {
		title: '招聘',
		tab: 'job'
	}]
}])