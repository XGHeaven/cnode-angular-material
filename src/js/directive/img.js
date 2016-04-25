import cnode from '../cnode'

// proxy avatar link
cnode.directive('img', (Setting) => {
	return {
		restrict: 'E',
		priority: 300,
		link: {
			pre: (scope, element, attrs) => {
				if (Setting.avatarProxy && element.hasClass('md-avatar')) {
					attrs.ngSrc = 'http://simple-proxy.xgheaven.cn/{{' + attrs.ngSrc.slice(2, -2) + ' | encodeURIComponent}}'
				}
			}
		}
	}
})
