import { Message, RichEmbed } from 'discord.js';
import { DiscordManager } from '../managers/DiscordManager';

export const description = 'Displays general information about this bot.';
export const usage = '';
export const permission = 'MANAGE_MESSAGES';

export const run = async (message: Message) => {
  const user = DiscordManager.discord.client.user;
  message.channel.send(new RichEmbed()
    .setDescription("Bot Information")
    .setColor("#FBD415")
    .setThumbnail(user.displayAvatarURL)
    .addField("Bot Name", user.username)
    .addField("Created On", user.createdAt));
};
