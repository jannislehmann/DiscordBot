/**
 * @overview ConfigManager
 * @author Jannis 'Cludch' Lehmann
 *
 * Config manager
 * Handles database synced configuration
 */

import { configModel, ConfigModel } from '../models/Config';
import { Manager } from './Manager';

const MINUTE_IN_MILLISECONDS = 60000;

/**
 * Database configuration manager
 *
 * @export
 * @class ConfigManager
 * @extends {Manager}
 */
export class ConfigManager extends Manager {
	/**
	 * This instance
	 *
	 * @static
	 * @type {ConfigModel}
	 */
	static config: ConfigModel;

	/**
	 * Initiliazes the database configuration manager
	 */
	async init() {
		try {
			// Search config object in the database
			let config: ConfigModel | null = await configModel.findOne({});

			// If this is the first ever start, create the config object
			if (!config) {
				this.warn('No configuration found. Assuming that this is the first ever start!');
				config = new configModel({});

				await config.save();
			}

			// Allow other classes to access the ConfigManager instance
			ConfigManager.config = config;

			// Run the config updater every minute
			setInterval(this.update, MINUTE_IN_MILLISECONDS);
		} catch (error) {
			this.error(error);
		}
	}

	/**
	 * Queries new config from the database
	 */
	update() {
		configModel.findOne({}, (error: Error, config: ConfigModel) => {
			if (error) this.error(error);
			ConfigManager.config = config;
		});
	}
}
