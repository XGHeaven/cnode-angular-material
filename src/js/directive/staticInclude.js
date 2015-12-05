import cnode from '../cnode'

cnode.directive('staticInclude', ƒ(($http, $templateCache, $compile) => {
	return (scope, element, attrs) => {
		let templatePath = attrs.staticInclude
		$http.get(templatePath, {cache: $templateCache}).success(template => {
			let contents = element.html(template).contents()
			$compile(contents)(scope)
		})
	}
}))