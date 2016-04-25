import cnode from '../cnode'

cnode.filter('encodeURIComponent', () => {
	return window.encodeURIComponent
})
