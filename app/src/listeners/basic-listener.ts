import { pubsub } from "../controllers"
import { getLogger } from "../lib/logger"
import config from "../config"

const logger = getLogger("basic-listener", config.app);

export async function listen(emitter: any) {
	const channel = {
		source: `demo:pubsub:scores`, // redis topic
		target: "scores", // event to fire
	}

	pubsub.subscribe(channel);
	emitter.on("scores", handleVotes);
}

function handleVotes(evt: any) {
	logger.debug("scores received:", { evt });
}