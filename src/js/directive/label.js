import cnode from '../cnode'

cnode.directive('cnLabel', () => {
	return {
		restrict: 'E',
		template: '<span class="label label-default cn-label-{{tab}}">{{tab | tabTrans}}</span>',
		replace: true,
		scope: {
			tab: '=cnTab'
		}
	}
})
