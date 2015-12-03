import cnode from '../cnode'

cnode.factory('API', ['$http', '$q', '$mdToast', 'tabName', 'User', ($http, $q, $mdToast, tabName, User) => {
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

	function postLike(replyId) {
		if (User.isLogin()) {
			return $http.post(`${url}/reply/${replyId}/ups`, {
				accesstoken: User.getSetting().accessToken
			})
		} else {
			show('need login in, to `Setting` set accesstoken')
		}
	}

	function show(string, delay=2000) {
		$mdToast.show($mdToast.simple(string).position('top left').hideDelay(delay))
	}

	return {
		getTopics,
		getTopic,
		postLike
	}
}])