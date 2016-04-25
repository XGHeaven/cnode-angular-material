import cnode from '../cnode'

cnode.service('Message', function($timeout, $rootScope, API, Setting, Event){
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

	Event.$on('updatedUser', () => {
		this.start()
	})

	Event.$on('logout', () => {
		delete $rootScope.messages
	})

	function check() {
		API.getMessages().then(res => {
			let data = res.data

			$rootScope.messages = data.data
		}, res => {
			console.log('error')
		}).finally(() => {
			// default is 1 min
			if (status) timer = $timeout(check, Setting.interval || 60000)
			else timer = null
		})
	}
})
