import cnode from './cnode'

import fs from 'fs'

function load(dir) {
	let files = fs.readdirSync(dir)
	
	for (let file of files) {
		cnode[dir](require('./' + dir + '/' + file))
	}
}

require('./**?/*.js', {mode:'expand'})