import cnode from '../cnode'

cnode.factory('Msgbox', ['$mdToast', ($mdToast) => {

	/**
	 * msg {String} msg to show
	 * [action] {String} the action to do
	 * [delay] {Number} the microsecond to disappear
	 */
	function show(msg, action, delay = 1000) {

		if (!msg) {
			throw new TypeError('need msg argument')
		}

		if (typeof action === 'number') {
			delay = action
			action = void 0
		}

		let toast = $mdToast.simple(msg)
			.position('top right')
			.hideDelay(delay)

		if (typeof action === 'string') {
			toast.action(action)
		}

		return $mdToast.show(toast)
	}

	function alert(msg, delay) {
		return show(msg, '关闭')
	}

	return {
		show,
		alert
	}
}])