import cnode from '../cnode'

cnode.controller('RootController', ƒ((
		$rootScope, $mdSidenav, $mdMedia, $state,
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

	$rootScope.isLogin = () => !!$rootScope.user.id;

	// setup global shortcut
	hotkeys.add({
		combo: 'm',
		description: '打开消息(message)',
		callback(event, hotkey) {
			$state.go('main.messages');
		}
	});
	hotkeys.add({
		combo: 's',
		description: '打开设置面板(setting)',
		callback(event, hotkey) {
			$state.go('main.setting');
		}
	});
	TopicType.forEach((topic, i) => {
		hotkeys.add({
			combo: i + 1 + '',
			description: `打开 ${topic.title}`,
			callback(e, h) {
				e.preventDefault();
				$state.go('main.list', {tab: topic.tab});
			}
		});
	});
	console.log(hotkeys);
	$rootScope.event = Event
}))
