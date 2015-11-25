import cnode from '../cnode'

cnode.factory('User', ['$http', '$q', '$rootScope', '$localStorage', '$mdToast', ($http, $q, $rootScope, $localStorage, $mdToast) => {
	let setting = $localStorage.setting || {}
	let user = $localStorage.user || {}

	$rootScope.CNUser = user
	$rootScope.CNSetting = setting

	function saveSetting(set) {
		$rootScope.CNSetting = $localStorage.setting = setting = set
	}

	function saveUser(usr) {
		$rootScope.CNUser = $localStorage.user = user = usr
	}

	function updateUser() {
		let defer = $q.defer()
		_userUpdating()

		$http.post('https://cnodejs.org/api/v1/accesstoken', {
			accesstoken: setting.accessToken
		}).success((data) => {
			if (data.success) {
				return $http.get('https://cnodejs.org/api/v1/user/' + data.loginname)
				.success((data) => {
					saveUser(data.data)
				})
			}
			return $q.reject(new Error('invalid AccessToken'))
		}).then(() => {
			_userUpdated(3000)
			defer.resolve(user)
		}).catch((err) => {
			_userUpdatedError()
			defer.reject(err)
		})

		return defer.promise;
	}

	function getSetting() {
		return setting = $localStorage.setting;
	}

	function _userUpdating(...args) {
		_show('updating user...', ...args)
	}

	function _userUpdated(...args) {
		_show('updated user...', ...args)
	}

	function _userUpdatedError(...args) {
		_show('updated user error!', ...args)
	}

	function _show(string, delay=1000) {
		$mdToast.show($mdToast.simple(string).position('top left').hideDelay(delay))
	}

	function clear() {
		$rootScope.CNSetting = $localStorage.setting = setting = {}
		$rootScope.CNUser = $localStorage.user = user  = {}
	}

	return {
		saveSetting,
		updateUser,
		getSetting,
		clear,
	}
}])