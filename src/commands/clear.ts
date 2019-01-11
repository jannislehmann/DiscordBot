import { Message, TextChannel } from 'discord.js';
import { wrongCommandUsage } from '../errors/wrong-command-usage';
import { DiscordManager } from '../managers/DiscordManager';

export const description = 'Clears messages.';
export const usage = '<amount: number/string(all)>';
export const permission = 'MANAGE_MESSAGES';

export const run = async (message: Message) => {
  const content = message.content;
  const param = content.split(' ').slice(1, content.length).join('');
  if (param === 'all') {
    message.channel.bulkDelete(await message.channel.fetchMessages());
    DiscordManager.discord.logDiscord(`\`${message.author.tag}\` cleared `
      + `\`#${(message.channel as TextChannel).name}\``, false);
  } else if (!isNaN(+param)) {
    const limit = +param;
    await message.channel.bulkDelete(await message.channel.fetchMessages({ limit }));
    DiscordManager.discord.logDiscord(`\`${message.author.tag}\` cleared ${limit} messages from `
      + `\`#${(message.channel as TextChannel).name}\``, false);
  } else {
    (await message.channel.send(wrongCommandUsage) as Message).delete(2000);
  }
};
