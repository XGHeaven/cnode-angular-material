import cnode from '../cnode'

cnode.controller('RootController', (
		$rootScope, $mdSidenav, $mdMedia, $state, $localStorage, $timeout,
		Message, Event, Msgbox, hotkeys, TopicType
	) => {
	// instance message
	// console.log($mdMedia)

	$rootScope.toggleSider = () => {
		if ($mdMedia('gt-md')) { return }

		$mdSidenav('sider')
		.toggle()
		.then(() => {})
		.catch(() => {})
	}

	$rootScope.logout = () => {
		Msgbox.confirm('真的要退出么？').then(() => {
			Event.$emit('logout')
		}).catch(() => {
			Msgbox.alert('感谢您的不杀之恩~~~')
		})
	}

	$rootScope.isLogin = () => !!$rootScope.user.id

	// setup global shortcut
	hotkeys.add({
		combo: 'm',
		description: '打开消息(message)',
		callback(event, hotkey) {
			$state.go('main.messages')
		}
	})
	hotkeys.add({
		combo: 's',
		description: '打开设置面板(setting)',
		callback(event, hotkey) {
			$state.go('main.setting')
		}
	})
	TopicType.forEach((topic, i) => {
		hotkeys.add({
			combo: i + 1 + '',
			description: `打开 ${topic.title}`,
			callback(e, h) {
				e.preventDefault()
				$state.go('main.list', {tab: topic.tab})
			}
		})
	})

	// wait for 5s to show keyboard help
	$timeout(() => {
		if (!$localStorage.ifShownHotkeysHelp) {
			Msgbox.show('输入 ? 查看键盘快捷键帮助', 5000)
			$localStorage.ifShownHotkeysHelp = true
		}
	}, 7000)

	$rootScope.event = Event
})
