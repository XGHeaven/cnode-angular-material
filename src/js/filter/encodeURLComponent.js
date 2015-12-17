import cnode from '../cnode'

cnode.filter('encodeURIComponent', ƒ(() => {
	return window.encodeURIComponent
}))