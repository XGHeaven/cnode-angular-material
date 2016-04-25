import cnode from '../cnode'

cnode.controller('SiderController', ($scope, TopicType) => {
	$scope.navs = TopicType;
})
