import { Message } from 'discord.js';
import { unknownUser } from '../errors/unknown-user';
import { DiscordManager } from '../managers/DiscordManager';
import { userNotMuted } from '../errors/user-not-muted';

export const description = 'Unmutes an user if is muted.';
export const usage = '<@user: User | string>';
export const permission = 'ADMINISTRATOR';

export const run = async (message: Message) => {
  const args = message.content.split(' ').slice(1);

  const target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) {
    (await message.channel.send(unknownUser) as Message).delete(5000);
    return;
  }

  let mutedRole = message.guild.roles.find(ch => ch.name === 'Muted');
  if (!mutedRole) mutedRole = await message.guild.createRole({ name: 'Muted' });

  if (!target.roles.find(role => role.name === mutedRole.name)) {
    (await message.channel.send(userNotMuted) as Message).delete(5000);
    return;
  }

  target.removeRole(mutedRole.id);
  DiscordManager.discord.logDiscord(`\`@${target.user.tag}\` has been unmuted!`, false);
};
