import cnode from '../cnode'

cnode.factory('User', ƒ(($http, $q, $rootScope, $localStorage, Msgbox, Setting, Event) => {
	let user = $localStorage.user || {}

	$rootScope.user = user

	Setting.$watch('accessToken', (nValue, oValue) => {
		// if new value is undefined, mean logout or never login, do nothing
		if (!nValue) return
		updateUser()
	})

	Event.$on('logout', () => {
		clear()
	})

	function saveUser(usr) {
		$rootScope.user = $localStorage.user = user = usr
		Event.$emit('updatedUser')
	}

	function updateUser() {
		let defer = $q.defer()
		_userUpdating()

		$http.post('https://cnodejs.org/api/v1/accesstoken', {
			accesstoken: Setting.accessToken
		}).success((data) => {
			if (data.success) {
				let id = data.id
				return $http.get('https://cnodejs.org/api/v1/user/' + data.loginname)
				.success((data) => {
					// bind user id, default is not bind
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
		$rootScope.user = user  = {}
		delete $localStorage.user
	}

	function isLogin() {
		return !!user.id
	}

	return {
		updateUser,
		clear,
		isLogin,
		get user() {
			return user
		}
	}
}))