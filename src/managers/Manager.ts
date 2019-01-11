/**
 * @overview Manager template
 * @author Jannis 'Cludch' Lehmann
 *
 * Will be extended by all managers
 */

import { Logger } from '../utils/Logger';

/**
 * Manager class, to be extended by every manager class
 *
 * @abstract
 * @class Manager
 */
export abstract class Manager {
	/**
	 * Class name
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Create an instance of Manager.
	 */
	constructor() {
		this.name = this.constructor.toString().match(/\w+/g)![1];

		this.debug('Called constructor');
	}

	/**
	 * Log a message with the class name in brackets
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	log(message: string): void {
		Logger.log(`[${this.name}] ${message}`);
	}

	/**
	 * Log a debug message with the class name in brackets if in development mode
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	debug(message: string): void {
		Logger.debug(`[${this.name}] ${message}`);
	}


	/**
	 * Forward the error to the logger class
	 *
	 * @param  {Error} error - error
	 * @return {void}
	 */
	error(error: Error): void {
		Logger.error(error, this.name);
	}

	/**
	 * Log a success message with the class name in brackets
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	success(message: string): void {
		Logger.success(`[${this.name}] ${message}`);
	}

	/**
	 * Log a warn message with the class name in brackets
	 *
	 * @param  {string} message - message to log
	 * @return {void}
	 */
	warn(message: string): void {
		Logger.warn(`[${this.name}] ${message}`);
	}
}
