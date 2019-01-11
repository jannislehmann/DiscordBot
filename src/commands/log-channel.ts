import { Message, TextChannel } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { wrongCommandUsage } from '../errors/wrong-command-usage';
import { unknownChannel } from '../errors/unknown-channel';

export const description = 'Updates the logging channel.';
export const usage = '<new channel: string>';
export const permission = 'ADMINISTRATOR';

export const run = async (message: Message) => {
  const args = message.content.split(' ');

  if (args.length === 1) {
    (await message.channel.send(wrongCommandUsage) as Message).delete(5000);
    return;
  }

  const name = args[1].replace('#', '');

  if (!message.guild.channels.filter(ch => ch.type === 'text').find(ch => (ch as TextChannel).name === name)) {
    (await message.channel.send(unknownChannel) as Message).delete(5000);
    return;
  }

  ConfigManager.config.discord.logging.channel = name;
  await ConfigManager.config.save();
  message.channel.send(`New logging channel is \`${name}\``);
};
