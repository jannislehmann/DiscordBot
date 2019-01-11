import { ConfigManager } from '../managers/ConfigManager';
import { DiscordManager } from '../managers/DiscordManager';

export const description = 'Toggles the bot logging feature.';
export const usage = '';
export const permission = 'ADMINISTRATOR';

export const run = async () => {
  ConfigManager.config.discord.logging.enabled = !ConfigManager.config.discord.logging.enabled;
  await ConfigManager.config.save();
  DiscordManager.discord.logDiscord('Bot logging is now turned '
    + `${ConfigManager.config.discord.logging.enabled ? 'on' : 'off'}.`, true);
};
