/**
 * @overview Teamspeak manager
 * @author Jannis 'Cludch' Lehmann
 *
 * Handles all the teamspeak related stuff
 */

import { Client, Message, PermissionResolvable, TextChannel } from 'discord.js';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { config } from '../config';
import { Logger } from '../utils/Logger';
import { ConfigManager } from './ConfigManager';
import { Manager } from './Manager';

/**
 * Discord class
 *
 * @export
 * @class DiscordManager
 * @extends {Manager}
 */
export class DiscordManager extends Manager {
	/**
	 * DiscordManager instance
	 *
	 * @static
	 * @type {*}
	 */
  static discord: DiscordManager;

  client: Client;

  commands: Map<string, {
    callback: Function,
    description: string,
    usage: string,
    permission: string
  }>;

  ids: Map<string, string>;

  loggingChannel: TextChannel | null;

  constructor() {
    super();

    DiscordManager.discord = this;
    this.client = new Client();
    this.commands = new Map();
    this.ids = new Map();

    this.loggingChannel = null;
  }

	/**
	 * Call this to init the discord client
	 */
  async init() {
    // Error "handler"
    this.client.on('error', Logger.error);

    this.initCommands();
    this.initEvents();
    await this.connect();

    if (ConfigManager.config.discord.logging.enabled) {
      this.loggingChannel = this.getLoggingChannel();

      if (!this.loggingChannel) {
        Logger.error(new Error('Could not find the discord logging channel! Please create the channel '
          + `#${ConfigManager.config.discord.logging.channel} and use `
          + `the ${ConfigManager.config.discord.commandPrefix}log-channel command to update the wanted logging channel`));
      }
    }
  }

	/**
	 * Connect
	 */
  async connect() {
    const { token } = config.discord;
    await this.client.login(token);
  }

  addCommand(name: string, description: string, usage: string, permission: string, callback: Function) {
    this.commands.set(name, {
      callback,
      description,
      permission,
      usage
    });

    this.debug(`Added the ${name} command`);
  }

  hasCommand(name: string) {
    return this.commands.has(name);
  }

  initCommands() {
    const filesPath = join(__dirname, '../', 'commands/');
    const files = readdirSync(filesPath);

    // Go through all files in the commands directory
    for (let i = 0; i < files.length; i++) {
      const fileStats = lstatSync(`${filesPath}${files[i]}`);
      if (fileStats.isFile()) {
        // Check if the file is a JS file
        const fileName = files[i].substring(0, files[i].length - 3);
        if (files[i].substring(files[i].length - 3, files[i].length) === '.js') {
          const command = require(`${filesPath}${files[i]}`);
          this.addCommand(fileName, command.description, command.usage, command.permission, command.run);
        }
      }
    }
  }

  runCommand(command: string, message: Message) {
    const commandRun = this.commands.get(command);
    if (commandRun === undefined) return;
    if (!message.member.permissions.has(commandRun.permission as PermissionResolvable)) return;

    commandRun.callback(message);
  }

  initEvents() {
    const filesPath = join(__dirname, '../', 'events/');
    const files = readdirSync(filesPath);

    // Go through all files in the events directory
    for (let i = 0; i < files.length; i++) {
      const fileStats = lstatSync(`${filesPath}${files[i]}`);
      if (fileStats.isFile()) {
        // Check if the file is a JS file
        const fileName = files[i].substring(0, files[i].length - 3);
        if (files[i].substring(files[i].length - 3, files[i].length) === '.js') {
          const event = require(`${filesPath}${files[i]}`);
          this.addEvent(fileName, event.run);
        }
      }
    }
  }

  addEvent(name: string, callback: Function) {
    this.client.on(name, callback);
    this.debug(`Added the ${name} event`);
  }

  updatePresence() {
    this.client.user.setPresence({ game: { name: ConfigManager.config.discord.activity }, status: 'online' });
  }

  getIdsMap() {
    return this.ids;
  }

  getLoggingChannel() {
    return this.client.channels.filter(ch => ch.type === 'text')
      .find(ch => (ch as TextChannel).name === ConfigManager.config.discord.logging.channel) as TextChannel;
  }

  logDiscord(message: string, force: boolean) {
    if (force || ConfigManager.config.discord.logging.enabled) {
      const channel = this.getLoggingChannel();
      if (channel) channel.send(message);
    }
  }
}
