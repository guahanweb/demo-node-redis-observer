import { createClient } from "../lib/redis"
import { emitter } from "../lib/event-bus"

let client: any;
let mapping: any = {};

// initialize with known list of channel mappings in place
export async function init(channels: any[] = []) {
	client = createClient();
	client.on("message", handleMessage);
	channels.forEach(subscribe);
}

// expose subscribe method for dynamic wiring
export function subscribe({ source, target }: { source: string, target: string }) {
	mapping[source] = target;
	client.subscribe(source);
}

// expose unsubscribe method for dynamic wiring
export function unsubscribe({ source }: { source: string }) {
	delete mapping[source];
	client.unsubscribe(source);
}

function handleMessage(channel: string, message: string) {
	// if we have a registered target, convert the message to an event
	const target = mapping && mapping[channel];
	if (target) {
		emitter.emit(target, JSON.parse(message));
	}
}