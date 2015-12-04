import cnode from '../cnode'

cnode.filter('Markdown', ['Marked', (Marked) => {
	return (string) => {
		return Marked.render(string)
	}
}])