import { CategoryChannel, VoiceChannel } from 'discord.js';
import { config } from '../config';
import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';
import { Logger } from '../utils/Logger';

export const run = async () => {
  Logger.success(`Connected!`);

  const channelStart = String.fromCodePoint(ConfigManager.config.discord.channelUnicode);
  const client = DiscordManager.discord.client;
  const guild = client.guilds.get(config.discord.guild);

  if (!guild) {
    Logger.error(new Error('Configured guildId is undefined for the current client'));
    return;
  }

  const roles = guild.roles;

  DiscordManager.discord.updatePresence();

  const defaultRoleId = roles.filter((role) => role.name === '@everyone').first().id;
  DiscordManager.discord.getIdsMap().set('defaultRoleId', defaultRoleId);
  Logger.log(`Set @everyone id to ${defaultRoleId}`);

  client.channels.filter(channel => channel.type === 'category').forEach((channel, id) => {
    const category = channel as CategoryChannel;

    if (category.name.startsWith(channelStart)) {
      DiscordManager.discord.getIdsMap().set('gamesCategoryId', id);
      Logger.log(`Set games category id to ${id} with name ${category.name}`);
    } else if (category.name.includes('Voice')) {
      DiscordManager.discord.getIdsMap().set('voiceCategoryId', id);
      Logger.log(`Set voice category id to ${id} with name ${category.name}`);
    }
  });

  // Delete all old channels with no members,
  // which sit under the gaming category and start with the emoji in case there are permanent channel.
  client.channels.filter(channel => channel.type === 'voice').forEach((channel) => {
    const voiceChannel = channel as VoiceChannel;

    if (voiceChannel.parentID === DiscordManager.discord.getIdsMap().get('gamesCategoryId')
      && voiceChannel.name.startsWith(channelStart)
      && voiceChannel.members.size === 0) {
      voiceChannel.delete().then(() => Logger.log(`Deleted voice channel ${voiceChannel.name}`));
    }
  });
};
