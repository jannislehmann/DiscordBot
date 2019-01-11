import { GuildMember, VoiceChannel } from 'discord.js';
import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';
import { Logger} from '../utils/Logger';

export const run = async (oldMember: GuildMember, member: GuildMember) => {
  const channelStart = String.fromCodePoint(ConfigManager.config.discord.channelUnicode);

  const defaultRoleId = DiscordManager.discord.getIdsMap().get('defaultRoleId');
  const gamesCategoryId = DiscordManager.discord.getIdsMap().get('gamesCategoryId');
  const voiceCategoryId = DiscordManager.discord.getIdsMap().get('voiceCategoryId');

  // Check if the user entered a new channel.
  if (member.voiceChannelID) {
    const newChannel = member.guild.channels.get(member.voiceChannelID);

    if (!newChannel) return;

    // If the user entered a game channel (prefixed with a game controller unicode emoji), group them into their own channel.
    if (newChannel.name.startsWith(channelStart) && newChannel.parentID === voiceCategoryId) {
      newChannel.clone(`${newChannel.name} ${member.displayName}`, false)
        .then(createdChannel => {
          const gamesCategory = member.guild.channels.get(`${gamesCategoryId}`);
          if (!gamesCategory) return;

          createdChannel.setParent(gamesCategory).then(createdChannel => {
            const permissionPromises = [];
            for (const permissionOverwrite of newChannel.permissionOverwrites.array()) {
              const roleId = permissionOverwrite.id;
              if (roleId === defaultRoleId) continue;

              const role = member.guild.roles.get(roleId);
              if (!role) return;
              permissionPromises.push(createdChannel.overwritePermissions(role, {
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                USE_VAD: true
              }));
            }

            // Move the user into the channel *after* setting all permissions. This caused a race condition earlier.
            Promise.all(permissionPromises).then(() => {
              member.setVoiceChannel(createdChannel);
              Logger.log(`Moved user ${member.user.tag} to ${createdChannel.type} channel ${createdChannel.name} `
              + `(${createdChannel.id})`);
            }).catch(Logger.error);
          });
        }).catch(Logger.error);
    }
  }

  // Check if the user came from another channel.
  if (oldMember.voiceChannelID) {
    const oldChannel = oldMember.guild.channels.get(oldMember.voiceChannelID) as VoiceChannel;

    // Just some sanity checks.
    if (typeof oldChannel === 'undefined') return;

    // Delete the user's now empty temporary channel, if applicable.
    if (oldChannel.name.startsWith(channelStart) && oldChannel.parentID === gamesCategoryId && !oldChannel.members.size) {
      oldChannel.delete().then(() => Logger.log(`Deleted ${oldChannel.type} channel ${oldChannel.name} (${oldChannel.id})`))
        .catch(Logger.error);
    }
  }
};
