import marked from 'marked'
import hljs from 'highlight.js'

const md = {
	render(string) {
		return marked(string, {
			highlight: (string, lang) => {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(lang, string).value
					} catch(e) {}
				}
				
				try {
					return hljs.highlightAuto(string).value
				} catch(e) {}
				
				return ''
			}
		})
	}
}

export default md