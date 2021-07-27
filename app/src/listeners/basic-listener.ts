import { pubsub } from "../controllers"

export async function listen(emitter: any) {
	const channel = {
		// redis channel to which to subscribe
		source: `my:channel`,
		// event name we want to broadcast
		target: "my.activity",
	}

	pubsub.subscribe(channel);

	// basic app ready to show wiring
	emitter.on("app.ready", function () {
		emitter.emit(["ready", "ok"]);
	});
}