/**
 * @overview Loger utility
 * @author Jannis 'Cludch' Lehmann
 *
 * Will be used to log to the console
 */

/**
 * Logger utils
 *
 * @export
 * @class Logger
 */
export class Logger {
	/**
	 * Log a message with time as prefix to the console
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	static log(message: string): void {
		const date = new Date();

		let hours = `${date.getHours()}`;
		let minutes = `${date.getMinutes()}`;
		let seconds = `${date.getSeconds()}`;

		// If taller or equal 10 -> Add a 0 infront of the number
		hours = +hours >= 10 ? hours : `0${hours}`;
		minutes = +minutes >= 10 ? minutes : `0${minutes}`;
		seconds = +seconds >= 10 ? seconds : `0${seconds}`;

		console.log(`[${hours}:${minutes}:${seconds}] ${message}`);
	}

	/**
	 * Logs a debug message if in development mode
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	static debug(message: string): void {
		if (process.env.NODE_ENV === 'development') {
			Logger.log(`[DEBUG] ${message}`);
		}
	}

	/**
	 * Throw an error if in development environment else log it
	 *
	 * @param  {Error} error - error
	 * @param  {string} prefix a prefix for source information
	 * @return {void}
	 */
	static error(error: Error, prefix = 'MAIN'): void {
		if (process.env.NODE_ENV === 'development') {
			throw error;
		} else {
			console.log(`[${prefix}] ${(error as Error).stack}`);
		}
	}

	/**
	 * Log a success message
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	static success(message: string): void {
		Logger.log(`[SUCCESS] ${message}`);
	}

	/**
	 * Log a warn message
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	static warn(message: string): void {
		Logger.log(`[WARNING] ${message}`);
	}
}
