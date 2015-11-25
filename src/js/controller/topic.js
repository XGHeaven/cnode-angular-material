import cnode from '../cnode'
import md from '../utils/md'
import angular from 'angular'

cnode.controller('TopicController', ['$scope', 'API', '$state', ($scope, API, $state) => {
	API.getTopic($state.params.id).success(data => {
		console.log(data.data.content)
		data.data.content = md.render(data.data.content)
		
		data.data.replies.forEach(reply => {
			reply.content = md.render(reply.content)
		})

		angular.extend($scope, data.data)
	})
}])