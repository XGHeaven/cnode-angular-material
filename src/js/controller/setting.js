import cnode from '../cnode'

cnode.controller('SettingController', ($scope, Setting, Msgbox) => {
	$scope.setting = Setting.$pure()
	$scope.save = () => {
		Setting.$save($scope.setting)
		Msgbox.alert('设置保存成功！')
	}
})
