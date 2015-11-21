import cnode from '../cnode'
import md from '../utils/md'

cnode.controller('TopicDialogController', ['$scope', '$mdDialog', 'API', 'TopicID', ($scope, $mdDialog, API, id) => {
	API.getTopic(id).success(data => {
		data.data.content = md.render(data.data.content)
		
		data.data.replies.forEach(reply => {
			reply.content = md.render(reply.content)
		})
		
		Object.assign($scope, data.data)
	})
	
	$scope.close = () => {
		$mdDialog.hide()
	}
}])