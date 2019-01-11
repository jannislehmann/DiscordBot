/**
 * @overview Configuration model
 * @author Jannis 'Cludch' Lehmann
 *
 * Configuration model
 */

import { Document, Model, model, Schema } from 'mongoose';
import { Config } from '../interfaces/Config';

export interface ConfigModel extends Config, Document { }

export const configSchema: Schema = new Schema({
	discord: {
		activity: { type: String, required: true, default: 'Discord bot by Cludch' },
		channelUnicode: { type: Number, required: true, default: 0x1F3AE }, // 🎮
		commandPrefix: { type: String, required: true, default: '.' },
		logging: {
			enabled: { type: Boolean, required: true, default: true},
			channel: { type: String, required: true, default: 'bot' }
		}
	}
});

export const configModel: Model<ConfigModel> = model<ConfigModel>('Config', configSchema);
