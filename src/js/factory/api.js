import cnode from '../cnode'

cnode.factory('API', ['$http', '$q', 'User', 'Msgbox', ($http, $q, User, Msgbox) => {
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
		}).then(res => {
			if (!res.data.success) {
				return $q.reject(res)
			}
			
			switch(res.data.action) {
				case 'up':
					Msgbox.alert('点赞成功')
					break
				case 'down':
					Msgbox.alert('取消点赞成功')
					break
			}
			return res
		}, res => {
			Msgbox.alert(res.data.error_msg)
			return $q.reject(res)
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

	const getMessages = needLogin(function getMessages() {
		Msgbox.alert('获取未读消息中...')
		return $http.get(`${url}/messages`, {
			params: {
				accesstoken: User.getSetting().accessToken,
				mdrender: false
			}
		}).then(res => {
			if (res.data && res.data.hasnot_read_messages && res.data.hasnot_read_messages.length) {
				Msgbox.alert(`您有 ${res.data.hasnot_read_messages.length} 条未读消息`)
			} else {
				Msgbox.alert(`您暂时没有未读消息`)
			}
			return res
		}, res => {
			Msgbox.alert(`获取消息失败...发生错误...`)
			return $q.reject(res)
		})
	})

	return {
		getTopics,
		getTopic,
		postUps,
		postTopicReply,
		postTopic,
		getMessages
	}
}])