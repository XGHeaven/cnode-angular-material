import cnode from '../cnode'
import md from '../utils/md'
import angular from 'angular'

cnode.controller('TopicController', ['$scope', 'API', '$state', 'User', ($scope, API, $state, User) => {
	// use in dialog and router
	API.getTopic($state.params.id || $scope.id).success(data => {
		$scope.$emit('TopicTitle', data.data.title)

		angular.extend($scope, data.data)
	})

	$scope.star = (reply) => {
		API.postUps(reply.id).then(data => {
			reply.ups.push(User.user.id)
		})
	}
}])