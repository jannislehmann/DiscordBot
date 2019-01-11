import { Message } from 'discord.js';
import { unknownUser } from '../errors/unknown-user';
import { wrongCommandUsage } from '../errors/wrong-command-usage';
import { DiscordManager } from '../managers/DiscordManager';

export const description = 'Mutes an user for a given time.';
export const usage = '<@user: User | string> <time (x minutes): number>';
export const permission = 'ADMINISTRATOR';

export const run = async (message: Message) => {
  const args = message.content.split(' ').slice(1);
  const duration = +args[1];

  if (isNaN(duration)) {
    (await message.channel.send(wrongCommandUsage) as Message).delete(5000);
    return;
  }

  const target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) {
    (await message.channel.send(unknownUser) as Message).delete(5000);
    return;
  }

  let mutedRole = message.guild.roles.find(ch => ch.name === 'Muted');
  if (!mutedRole) mutedRole = await message.guild.createRole({ name: 'Muted' });

  // Update all channels
  message.guild.channels.filter(ch => ch.type === 'text').forEach(async (channel) => {
    await channel.overwritePermissions(mutedRole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
  });

  await (target.addRole(mutedRole.id));
  DiscordManager.discord.logDiscord(`\`@${target.user.tag}\` has been muted for ${duration} `
    + `${duration === 1 ? 'minute' : 'minutes'}`, false);

  setTimeout(() => {
    if (!target.roles.find(role => role.name === mutedRole.name)) return;
    target.removeRole(mutedRole.id);
    DiscordManager.discord.logDiscord(`\`@${target.user.tag}\` has been unmuted!`, false);
  }, duration * 1000 * 60);
};
