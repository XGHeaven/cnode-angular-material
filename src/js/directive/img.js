import cnode from '../cnode'

// proxy avatar link
cnode.directive('img', ƒ((Setting) => {
	return {
		restrict: 'E',
		priority: 300,
		link: {
			pre: (scope, element, attrs) => {
				if (Setting.avatarProxy && element.hasClass('md-avatar')) {
					console.log(attrs.ngSrc)
					attrs.ngSrc = 'http://simple-proxy.xgheaven.cn/{{' + attrs.ngSrc.slice(2, -2) + ' | encodeURIComponent}}'
				}
			}
		}
	}
}))