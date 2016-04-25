import cnode from '../cnode'

cnode.config(($httpProvider) => {
	$httpProvider.interceptors.push(['$q', '$rootScope', ($q, $rootScope) => {
		function request(config) {
			start()
			return config
		}

		function requestError(rejection) {
			stop()
			return $q.reject(rejection)
		}

		function response(res) {
			stop()
			return res;
		}

		function responseError(rejection) {
			stop()
			return $q.reject(rejection)
		}

		function start() {
			$rootScope.loading = true
		}
		function stop() {
			$rootScope.loading = false
		}

		return {
			request,
			requestError,
			response,
			responseError
		}
	}])
})
