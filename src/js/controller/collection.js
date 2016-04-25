import cnode from '../cnode'
import angular from 'angular'

cnode.controller('CollectionController', ($scope, $mdDialog, $state, API, $mdMedia, Setting) => {
	$scope.pages = []

	$scope.load = (page) => {
		return API.getCollection($state.params.name, $scope.pages.length+1).then(res => res.data.data)
	}

	$scope.showTopic = (e,id) => {
		$state.go('main.topic', {id})
	}
})
