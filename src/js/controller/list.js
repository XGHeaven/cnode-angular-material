import cnode from '../cnode'
import angular from 'angular'

cnode.controller('ListController', ƒ(($scope, $mdDialog, $state, API, $mdMedia, Setting) => {
	const tab = $state.params.tab || 'all'

	$scope.pages = []

	// $scope.items = {
	// 	length: 0,
	// 	page: 0,
	// 	cache: [],
	// 	getItemAtIndex(index) {
	// 		console.log(index)
	// 		if (index > this.length-1) {
	// 			API.getTopics(tab, this.page+1).success(data => {
	// 				if (data.success) {
	// 					let data = data.data
	// 					this.length += data.length
	// 					this.page++
	// 					this.cache.push(...data)
	// 				}
	// 			})
	// 		} else {
	// 			return this.cache[index]
	// 		}
	// 	},
	// 	getLength() {
	// 		return this.length + 10
	// 	}
	// }
	
	$scope.gotoTopic = id => {
		$state.go('main.topic', {id})
	}

	$scope.loadMore = () => {
		$scope.topicLoading = true
		API.getTopics(tab, $scope.pages.length+1).success(data => {
			$scope.pages.push(data.data)
		}).finally(() => {
			$scope.topicLoading = false
		})
	}

	API.getTopics(tab).success(data => {
		$scope.pages.push(data.data)
	})
	
	$scope.showTopic = (e,id) => {
		if (!$mdMedia('gt-md') || Setting.isOpenWithoutModel) {
			return $scope.gotoTopic(id)
		}
		$mdDialog.show({
			controller: 'TopicDialogController',
			templateUrl: 'view/dialog/detail.html',
			parent: angular.element(document.body),
			targetEvent: e,
			clickOutsideToClose: true,
			locals: {
				TopicID: id
			}
		}).then(answer => {
			
		}, () => {
			
		})
	}
}))