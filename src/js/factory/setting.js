import cnode from '../cnode'

cnode.factory('Setting', ƒ(($rootScope, $localStorage, Event) => {
	// create isolate scope to save setting
	const setting = $rootScope.$new(true)
	function $save(config) {
		angular.merge(setting, config)
		$localStorage.setting = setting.$pure()
	}

	Object.defineProperty(setting, '$save', {
		value: $save,
		writable: false,
		enumerable: false,
		configurable: false
	})

	Object.defineProperty(setting, '$pure', {
		value: () => {
			let obj = {}
			Object.keys(setting).filter(key => key[0] != '$').forEach(key => {
				angular.extend(obj, {[key]: setting[key]})
			})
			return obj;
		},
		writable: false,
		enumerable: false,
		configurable: false
	})

	Object.defineProperty(setting, '$reset', {
		value: () => {
			Object.keys(setting).filter(key => key[0] !== '$').forEach(key => {
				delete setting[key]
			})
			// clear localstorage
			$localStorage.setting = {}
		},
		writable: false,
		enumerable: false,
		configurable: false
	})

	if ($localStorage.setting) {
		setting.$save($localStorage.setting)
	}
	$localStorage.setting = setting.$pure()
	$rootScope.setting = setting

	Event.$on('logout', () => {
		setting.$reset()
	})

	return setting;
}))