import cnode from '../cnode'

cnode.factory('Msgbox', ƒ(($mdToast, $mdDialog) => {

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

	function unSupport() {
		return alert('此功能暂时不支持，等待开发或者是社区提供API')
	}

	function confirm(title, body=title) {
		const confirmDialog = $mdDialog.confirm()
		.title(title)
		.textContent(body)
		.ok('确认')
		.cancel('取消')

		return $mdDialog.show(confim)
	}

	return {
		show,
		alert,
		unSupport,
		confirm
	}
}))