const Command = require('../../structures/Command');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = class Invite extends Command {
    constructor(...args) {
        super(...args, {
            name: "help",
            description: "Help Command for the Bot",
            aliases: ["h"],
            category: "info",
            usage: " ",
            accessableby: "everyone"
        });
    };

    async interactionRun(interaction) {
        try {
            await interaction.deferReply();

            const embed = new MessageEmbed()
                .setDescription(`The parameter that are enclosed with **<>** are compulsory paramter, the parameter that are enclosed with **[]** are optional.`)
                .addFields(
                    { name: `\`/addpokemoncurrency <addtype> <user> [pokemoname] [currency]\``, value: "Adds Pokemon or Currency to a specific **user**" },
                    { name: `\`/infopokemon <name>\``, value: "Gives a detailed information about a pokemon by taking its name!" },
                    { name: `\`/removepokemoncurrency <removetype> <user> [pokemoname] [currency]\``, value: "Removes Pokemon or Currency from a specific **user**" },
                    { name: `\`/showpokemon <generation>\``, value: "Shows all the pokemons abvailable in the bot by **generation** wise!" },
                    { name: `\`/showuserpokemon <user>\``, value: "Shows all the pokemon a **user** have collected!" },
                    { name: `\`/tracker <updatetype> [catchon] [channel] \``, value: "Updates the pokemon tracker, **catchon** means whether the pokemon spawn should be ON/OFF, **channel** means a specific channel where it would spwan!" },
                    { name: `\`/help\``, value: "Shows all the commands for the Bot." },
                    { name: `\`/botstats\``, value: "Shows the information about the Bot." },
                )
                .setAuthor({ name: "General Commands" })
                .setThumbnail(this.bot.user.displayAvatarURL())
                .setColor("#2a75bb")
                .setTimestamp()

            interaction.editReply({ embeds: [embed] })
        } catch (error) {
            console.error(error);
            return interaction.reply("Oops!! An Error Occurred, If you are seeing this message please notify the developer team.");
        };
    };
};