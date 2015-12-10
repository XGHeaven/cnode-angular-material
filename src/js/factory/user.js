import cnode from '../cnode'

cnode.factory('User', ƒ(($http, $q, $rootScope, $localStorage, Msgbox) => {
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
				let id = data.id
				return $http.get('https://cnodejs.org/api/v1/user/' + data.loginname)
				.success((data) => {
					data.data.id = id
					saveUser(data.data)
				})
			}
			return $q.reject(new Error('invalid AccessToken'))
		}).then(() => {
			_userUpdated(3000)
			defer.resolve(user)
		}).catch((err) => {
			_userUpdatedError(3000)
			defer.reject(err)
		})

		return defer.promise;
	}

	function getSetting() {
		return setting = $localStorage.setting;
	}

	function _userUpdating(...args) {
		Msgbox.alert('正在获取您的贵姓，贵庚...', ...args)
	}

	function _userUpdated(...args) {
		Msgbox.alert('登录成功，您可以使用了...', ...args)
	}

	function _userUpdatedError(...args) {
		Msgbox.alert('请您确认一下输入的东西是否正确，我被服务器拒绝了，-_-||', ...args)
	}

	function clear() {
		$rootScope.CNSetting = $localStorage.setting = setting = {}
		$rootScope.CNUser = $localStorage.user = user  = {}
	}

	function isLogin() {
		return !!user.id
	}

	return {
		saveSetting,
		updateUser,
		getSetting,
		clear,
		isLogin,
		get user() {
			return user
		}
	}
}))