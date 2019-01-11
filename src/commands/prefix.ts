import { Message } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { wrongCommandUsage } from '../errors/wrong-command-usage';

export const description = 'Updates the command prefix.';
export const usage = '<new prefix: char>';
export const permission = 'ADMINISTRATOR';

export const run = async (message: Message) => {
  const args = message.content.split(' ');

  if (args.length === 1) {
    (await message.channel.send(wrongCommandUsage) as Message).delete(5000);
    return;
  }

  ConfigManager.config.discord.commandPrefix = args[1].charAt(0);
  await ConfigManager.config.save();
  message.channel.send(`New prefix is \`${ConfigManager.config.discord.commandPrefix}\``);
};
