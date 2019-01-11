/**
 * @overview Database manager
 * @author Jannis 'Cludch' Lehmann
 *
 * Handles all the database related stuff
 */

import { connect, connection, Error as MongooseError } from 'mongoose';
import { config } from '../config';
import { Manager } from './Manager';

/**
 * Database class
 *
 * @export
 * @class DatabaseManager
 * @extends {Manager}
 */
export class DatabaseManager extends Manager {
	/**
	 * Call this to init the database manager
	 */
	async init() {
		// Object destructuring <3
		const { username, password, ip, port, database } = config.mongodb;
		try {
			await new Promise((resolve, reject) => {
				connect(`mongodb://${username}:${password}@${ip}:${port}/${database}`, { useNewUrlParser: true },
					err => err ? reject(err) : resolve());
				this.success('Database connection established');
			});
		} catch (error) {
			this.error(error);
		}

		// Error handler
		connection.on('error', (error: MongooseError) => this.error(error));
		connection.on('disconnected', () => this.warn('Database connection was lost'));
		connection.on('reconnected', () => this.log('Database connection re-established'));
	}
}
