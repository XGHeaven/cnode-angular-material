import cnode from '../cnode'

cnode.factory('API', ['$http', '$q', 'tabName', 'User', 'Msgbox', ($http, $q, tabName, User, Msgbox) => {
	const url = 'https://cnodejs.org/api/v1'

	function needLogin(fn) {
		return function(...args) {
			if (User.isLogin()) {
				return fn(...args)
			} else {
				Msgbox.alert('需要登录，请您在左侧内选择`设置`并输入您的 AccessToken', 5000)
				return $q.reject()
			}
		}
	}

	function getTopics(tab = 'all') {
		return $http.get(url + '/topics', {
			params: {
				tab,
				mdrender: false
			}
		})
	}
	
	function getTopic(id) {
		return $http.get(url + '/topic/' + id, {
			params: {
				mdrender: false
			}
		})
	}

	const postUps = needLogin(function postUps(replyId) {
		return $http.post(`${url}/reply/${replyId}/ups`, {
			accesstoken: User.getSetting().accessToken
		}).success(data => {
			switch(data.action) {
				case 'up':
					Msgbox.alert('点赞成功')
					break
				case 'down':
					Msgbox.alert('取消点赞成功')
					break
			}
			return data.action
		})
	})

	const postTopicReply = needLogin(function postTopicReply(topicId, content, replyId) {
		return $http.post(`${url}/topic/${topicId}/replies`, {
			accesstoken: User.getSetting().accessToken,
			content: content,
			replyId: replyId
		})
	})

	const postTopic = needLogin(function postTopic(tab, title, content) {
		return $http.post(`${url}/topics`, {
			tab, title, content,
			accesstoken: User.getSetting().accessToken
		}).then(res => {
			if (res.data.success) {
				Msgbox.alert('发表成功')
				return res
			} else {
				Msgbox.alert('发表失败')
				return $q.reject(res)
			}
		}, res => {
			Msgbox.alert(res.data.error_msg)
			return $q.reject(res)
		})
	})

	return {
		getTopics,
		getTopic,
		postUps,
		postTopicReply,
		postTopic
	}
}])