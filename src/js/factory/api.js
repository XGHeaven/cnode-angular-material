import cnode from '../cnode'

cnode.factory('API', ['$http', '$q', ($http, $q) => {
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
	
	return {
		getTopics,
		getTopic
	}
}])