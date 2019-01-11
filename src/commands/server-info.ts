import { Message, RichEmbed } from 'discord.js';

export const description = 'Displays general information about this server.';
export const usage = '';
export const permission = 'MANAGE_MESSAGES';

export const run = async (message: Message) => {
  const { name, createdAt, iconURL, memberCount } = message.guild;
    message.channel.send(new RichEmbed()
    .setDescription('Server Information')
    .setColor('#FBD415')
    .setThumbnail(iconURL)
    .addField('Server Name', name)
    .addField('Created On', createdAt)
    .addField('You Joined', message.member.joinedAt)
    .addField('Total Members', memberCount));
};
