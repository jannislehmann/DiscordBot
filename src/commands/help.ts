import { Message, PermissionResolvable } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';

export const description = 'Lists all available commands.';
export const usage = '';
export const permission = 'SEND_MESSAGES';

export const run = async (message: Message) => {
  const channel = message.channel;

  let reply = '';
  await DiscordManager.discord.commands.forEach(async (commandData, command: string) => {
    if (!message.member.permissions.has(commandData.permission as PermissionResolvable)) return;

    reply += `\`${ConfigManager.config.discord.commandPrefix}${command} ${commandData.usage}\` - ${commandData.description}\n`;
  });

  channel.send(reply);
};
