/**
 * @overview Entry point
 * @author Jannis 'Cludch' Lehmann
 *
 * Use this to start the discord bot
 */

import { ConfigManager } from './managers/ConfigManager';
import { DatabaseManager } from './managers/DatabaseManager';
import { DiscordManager } from './managers/DiscordManager';
import { Logger } from './utils/Logger';

/**
 * Default error handling
 */
process.on('uncaughtException', (error: Error) => Logger.error(error));
process.on('unhandledRejection', (error: Error) => Logger.error(error));

/**
 * Yes, this was needed - Cludch
 */
Logger.log('------------------------------------');
Logger.log('-            Discord Bot           -');
Logger.log('-                                  -');
Logger.log('-        Copyright (c) 2019        -');
Logger.log('-                                  -');
Logger.log('-             Authors:             -');
Logger.log('-             - Cludch             -');
Logger.log('------------------------------------');

Logger.log(`Using ${process.env.NODE_ENV} environment`);

/**
 * Initialize all manager
 */
const databaseInstance = new DatabaseManager();
const configInstance = new ConfigManager();
const discordInstance = new DiscordManager();

(async () => {
	try {
		await databaseInstance.init();
		await configInstance.init();
		await discordInstance.init();
	} catch (error) {
		/**
		 * Don't use the logger for this one.
		 * If anything happens during start up, just kill it
		 */
		if (process.env.NODE_ENV === 'development') Logger.error(error);
		process.exit(-1);
	}
})();
