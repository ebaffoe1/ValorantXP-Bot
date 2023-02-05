const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class BotStats extends Command {
    constructor(...args) {
        super(...args, {
            name: "botstats",
            description: "Shows the stats of the bot",
            aliases: ["bs"],
            category: "info",
            usage: " ",
            accessableby: "everyone",
        });
    };

    async interactionRun(interaction) {
        try {
            const days = Math.floor(this.bot.uptime / 86400000);
            const hours = Math.floor(this.bot.uptime / 3600000) % 24;
            const minutes = Math.floor(this.bot.uptime / 60000) % 60;
            const seconds = Math.floor(this.bot.uptime / 1000) % 60;

            let memberCount = 0;

            for (const [, guild] of this.bot.guilds.cache) {
                memberCount += guild.memberCount;
            };

            await interaction.deferReply();
            let msg = await interaction.channel.send('Pinging...');
            const ping = msg.createdTimestamp - interaction.createdTimestamp;

            const embed = new MessageEmbed()
                .setAuthor({ name: this.bot.user.username, iconURL: this.bot.user.displayAvatarURL() })
                .setThumbnail(this.bot.user.displayAvatarURL())
                .setColor("#301934")
                .addFields(
                    { name: '**Uptime**', value: `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`, inline: true },
                    { name: '**Serving Total Servers**', value: `${this.bot.guilds.cache.size}`, inline: true },
                    { name: '**Serving Total Members**', value: `${memberCount}`, inline: true },
                    { name: '**Ping**', value: `<:hourglass_flowing_sand:699128011743690794> ${ping} • 💓${Math.round(this.bot.ws.ping)}`, inline: true },
                )
                .setFooter({ text: "The Bot Supports Slash Commands Only Use /help to get started", iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setTimestamp()
            await msg.delete();
            return interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply("Oops!! An Error Occurred, If you are seeing this message please notify the developer team.");
        };
    };
};