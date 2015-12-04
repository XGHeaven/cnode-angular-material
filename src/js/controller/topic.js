import cnode from '../cnode'
import md from '../utils/md'
import angular from 'angular'

cnode.controller('TopicController', ['$scope', 'API', '$state', 'User', 'Msgbox', ($scope, API, $state, User, Msgbox) => {
	$scope.replyPreview = false
	$scope.togglePreview = () => ($scope.replyPreview = !$scope.replyPreview)
	$scope.replyText = $scope.replyFor = void 0

	// use in dialog and router
	API.getTopic($state.params.id || $scope.id).success(data => {
		$scope.$emit('TopicTitle', data.data.title)
		angular.extend($scope, data.data)
	})

	$scope.star = (reply) => {
		API.postUps(reply.id).success(data => {
			switch(data.action) {
				case 'up':
					reply.ups.push(User.user.id)
					break
				case 'down':
					reply.ups.splice(reply.ups.indexOf(User.user.id), 1)
					break
			}
		})
	}

	$scope.submit = () => {
		API.postTopicReply($scope.id, $scope.replyText, $scope.replyFor && $scope.replyFor.id).success(data => {
			if (data.success) {
				$scope.replies.push({
					id: data.reply_id,
					author: {
						loginname: User.user.loginname,
						avatar_url: User.user.avatar_url
					},
					content: $scope.replyText,
					ups: [],
					create_at: new Date().toISOString()
				})
				$scope.replyText = $scope.replyFor = void 0
			} else {
				Msgbox.alert('评论失败，请检测网络是否联通...')
			}
		})
	}

	$scope.replyTo = (reply) => {
		$scope.replyText = `@${reply.author.loginname} `
		$scope.replyFor = reply

		// focus
		document.getElementById('replyText').focus()
	}
	$scope.removeReplyFor = () => $scope.replyFor = void 0
}])