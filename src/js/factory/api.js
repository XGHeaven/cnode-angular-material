import cnode from '../cnode'

cnode.factory('API', ['$http', '$q', 'tabName', 'User', 'Msgbox', ($http, $q, tabName, User, Msgbox) => {
	const url = 'https://cnodejs.org/api/v1'

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

	function postUps(replyId) {
		if (User.isLogin()) {
			return $http.post(`${url}/reply/${replyId}/ups`, {
				accesstoken: User.getSetting().accessToken
			}).success(data => {
				Msgbox.alert('点赞成功')
				return data
			})
		} else {
			Msgbox.alert('需要登录，请您在左侧内选择`设置`并输入您的 AccessToken', 5000)
			return $q.reject()
		}
	}

	return {
		getTopics,
		getTopic,
		postUps
	}
}])