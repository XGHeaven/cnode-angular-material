import cnode from '../cnode'

cnode.controller('SettingController', ['$scope', '$mdToast', ($scope, $mdToast) => {
	$scope.save = () => {
		$mdToast.show($mdToast.simple().content('Saving...').position('top right').hideDelay(2000))
	}
}])