import cnode from '../cnode'

cnode.filter('removeTail', () => {
	return function(string) {
		// Material App
		string = string.replace('来自酷炫的 [CNodeMD](https://github.com/TakWolf/CNode-Material-Design)', '')
		// Ionic
		string = string.replace('自豪地采用 [CNodeJS ionic](https://github.com/lanceli/cnodejs-ionic)', '')
		// Vue.js
		string = string.replace('<br/><br/><a class="form" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>', '')

		return string
	}
})
