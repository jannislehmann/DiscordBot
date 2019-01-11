import { Message } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';
import { wrongCommandUsage } from '../errors/wrong-command-usage';

export const description = 'Updates the current activity.';
export const usage = '<new activity: string>';
export const permission = 'ADMINISTRATOR';

export const run = async (message: Message) => {
  const params = message.content.split(' ');

  if (params.length === 1) {
    (await message.channel.send(wrongCommandUsage) as Message).delete(5000);
    return;
  }

  const activity = params.slice(1).join(' ');

  ConfigManager.config.discord.activity = activity;
  await ConfigManager.config.save();
  DiscordManager.discord.updatePresence();
  DiscordManager.discord.logDiscord(`\`${message.author.tag}\` set the activity to \`${activity}\``, false);
};
