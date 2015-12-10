import cnode from '../cnode'
import EventEmitter from 'events'

// use as event emitter as node
cnode.factory('Event', ƒ(() => {
	let event = new EventEmitter
	event.$on = event.on
	event.$emit = event.emit
	return event
}))