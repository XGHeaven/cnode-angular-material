import cnode from '../cnode'

cnode.filter('Markdown', (Marked) => {
	return (string) => {
		if (!string) return ''

		string = string.replace(/\[@(\w+)\]\(\/user\/\1\)/g, (match, name) => {
			return `[@${name}](#/main/user/${name}) `
		})

		return Marked.render(string)
	}
})
