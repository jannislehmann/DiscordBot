import { GuildMember, GuildChannel, TextChannel } from 'discord.js';

export const run = async (member: GuildMember) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find((ch: GuildChannel) => ch.name === 'mods') as TextChannel;

  if (!channel) return;
  
  // Send the message, mentioning the member
  channel.send(`@everyone: ${member} ist gejoint!`);
};
