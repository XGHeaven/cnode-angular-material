import cnode from '../cnode'

cnode.service('Message', ƒ(function($timeout, $rootScope, API){
	let interval = 3000
	let status = false
	let timer = null

	this.start = () => {
		status = true
		!timer && check()
	}

	this.stop = () => {
		status = false
	}

	this.check = check;

	function check() {
		API.getMessages().then(res => {
			let data = res.data

			$rootScope.messages = data.data
		}, res => {
			console.log('error')
		}).finally(() => {
			if (status) timer = $timeout(check, interval)
			else timer = null
		})
	}
}))