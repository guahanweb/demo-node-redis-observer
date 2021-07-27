import config from "./config"
import { getLogger } from "./lib/logger"
import { connect as initializeRedis } from "./lib/redis"
import { pubsub } from "./controllers"
import { listen } from "./listeners"
import { emitter } from "./lib/event-bus"

const logger = getLogger("main", config.app);

// execute the main program
logger.debug("starting app");
main();

async function main() {
	// bootstrap any necessary connections
	await bootstrap();
	logger.debug("bootstrap completed");
	
	// let's test
	emitter.on("ready.ok", function () {
		logger.info("READY HEARD!!!");
	})
	emitter.emit(["app", "ready"]);
}

async function bootstrap() {
	// initialize redis connection
	const redisLogger = getLogger("redis", config.app);
	await initializeRedis(config.redis, redisLogger);
	logger.debug("redis initialized");

	// initialize our pubsub wiring
	await pubsub.init();
	logger.debug("pubsub initialized");
	
	await listen(emitter);
	logger.debug("listeners initialized");
}
