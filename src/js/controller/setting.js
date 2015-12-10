import cnode from '../cnode'

cnode.controller('SettingController', ƒ(($scope, $mdToast, User) => {
	$scope.setting = angular.extend({}, User.getSetting() || {})
	$scope.save = () => {
		// $mdToast.show($mdToast.simple().content('Saving...').position('top right').hideDelay(2000))
		User.saveSetting($scope.setting)
		User.updateUser()
	}
}))