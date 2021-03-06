import cnode from '../cnode'

cnode.filter('tabTrans', (tabName) => {
	return (name) => {
		if (tabName.has(name)) return tabName.get(name)
		return tabName.get('unknow')
	}
})
