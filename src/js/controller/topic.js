import cnode from '../cnode'
import md from '../utils/md'

cnode.controller('TopicController', ['$scope', 'API', '$state', ($scope, API, $state) => {
	API.getTopic($state.params.id).success(data => {
		data.data.content = md.render(data.data.content)
		
		data.data.replies.forEach(reply => {
			reply.content = md.render(reply.content)
		})
		
		Object.assign($scope, data.data)
	})
}])