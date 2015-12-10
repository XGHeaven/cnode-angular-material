import cnode from '../cnode'

cnode.controller('SettingController', ƒ(($scope, User, Setting, Msgbox) => {
	$scope.setting = Setting.$pure()
	$scope.save = () => {
		Setting.$save($scope.setting)
		Msgbox.alert('设置保存成功！')
	}
}))