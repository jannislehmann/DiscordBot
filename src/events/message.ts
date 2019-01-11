import { Message } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';
import { Logger } from '../utils/Logger';
import { wrongCommandUsage } from '../errors/wrong-command-usage';

export const run = async (message: Message) => {
  // Command Handler
  if (!message.member.hasPermission('ADMINISTRATOR')) return;

  const { commandPrefix } = ConfigManager.config.discord;

  const params = message.content.split(' ');
  if (params[0].charAt(0) !== commandPrefix) return;
  const command = params[0].substr(1, params[0].length);

  if (DiscordManager.discord.hasCommand(command)) {
    Logger.debug(`User ${message.author.tag} is running command ${command} with ${message.content}`);
    await DiscordManager.discord.runCommand(command, message);
  } else {
    (await message.channel.send(wrongCommandUsage) as Message).delete(5000);
  }
};
