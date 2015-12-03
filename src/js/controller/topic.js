import cnode from '../cnode'
import md from '../utils/md'
import angular from 'angular'

cnode.controller('TopicController', ['$scope', 'API', '$state', 'User', ($scope, API, $state, User) => {
	API.getTopic($state.params.id).success(data => {
		data.data.content = md.render(data.data.content)
		
		data.data.replies.forEach(reply => {
			reply.content = md.render(reply.content)
		})

		angular.extend($scope, data.data)
	})

	$scope.star = (reply) => {
		API.postLike(reply.id).success(data => {
			reply.ups.push(User.user.id)
		})
	}
}])