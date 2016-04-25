import cnode from '../cnode'
import marked from 'marked'
// only support in nodejs
import hljs from 'highlight.js'

marked.setOptions({
	// break link with enter
	breaks: true
})

cnode.factory('Marked', () => {
	return {
		render(string) {
			if (!string) {
				return ''
			}
			return marked(string, {
				highlight: (string, lang) => {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return hljs.highlight(lang, string).value
						} catch(e) {} // eslint-disable-line no-empty
					}

					try {
						return hljs.highlightAuto(string).value
					} catch(e) {} // eslint-disable-line no-empty

					return ''
				}
			})
		}
	}
})
