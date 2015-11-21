import markdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = markdownIt()

md.set({
	breaks: true,
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

export default md