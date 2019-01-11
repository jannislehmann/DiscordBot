/**
 * @overview Configuration interface
 * @author Jannis 'Cludch' Lehmann
 *
 * Configuration interface
 */

/**
 * Configuration interface
 *
 * @export
 * @interface Config
 */
export interface Config {
	/**
	 * Discord configuration. 
	 */
	discord: {
		/**
		 * The activity, which will be shown for other users.
		 */
		activity: string;
		/**
		 * The unicode string to use for automatic channel creation.
		 */
		channelUnicode: number;
		/**
		 * A char or string, which will initiate every command.
		 */
		commandPrefix: string;

		logging: {
			enabled: boolean;
			/**
			 * The channel, which the bot will post his 'confidential' logs to.
			 */
			channel: string;
		}
	};
}
