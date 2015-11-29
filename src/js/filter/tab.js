import cnode from '../cnode'

cnode.filter('tabTrans', ['tabName', (tabName) => {
	return (name) => {
		if (tabName.hasOwnProperty(name)) return tabName[name]
		return tabName['unknow']
	}
}])