import { EventEmitter2 } from "eventemitter2"

export const emitter = new EventEmitter2({
	wildcard: true,
	delimiter: ".",
	newListener: false,
	maxListeners: 10,
	verboseMemoryLeak: false,
	ignoreErrors: false,
});
