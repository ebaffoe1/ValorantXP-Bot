const Command = require('../../structures/Command');
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');

module.exports = class Register extends Command {
    constructor(...args) {
        super(...args, {
            name: "register",
            description: "Register yourself with the bot!",
            aliases: ["r"],
            category: "info",
            usage: " ",
            accessableby: "everyone",
        });
    };

    async interactionRun(interaction) {
        try {

            //  await interaction.deferReply()

            const buildTag = `${interaction.user.username}#${interaction.user.discriminator}`

            const embed = new MessageEmbed()
            embed.setColor('#fa4454')
            embed.setTitle(`Welcome to the Registration ${buildTag}`)
            embed.setDescription("This bot needs to save your **Tag Line**, **Game Name** and lastly your server **Region** to your profile. So are you okay to share this information ?")
            embed.setTimestamp()

            const anotherRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle('DANGER')
                )

            const anotherRowDisabled = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('Yes')
                        .setStyle('SUCCESS')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('No')
                        .setStyle('DANGER')
                        .setDisabled(true)
                )

            const msg = await interaction.reply({ components: [anotherRow], embeds: [embed], fetchReply: true });
            const collector = msg.createMessageComponentCollector({ time: 60000 });

            const modal = new Modal()
                .setCustomId('myModal')
                .setTitle('Valorant XP Bot');

            const firstLine = new TextInputComponent()
                .setCustomId('tagline')
                .setLabel("Write your Tag Line")
                .setStyle('SHORT')
                .setPlaceholder('Ex: LAMP')
                .setRequired(true)
                .setMaxLength(15)
                .setMinLength(3)

            const secondLine = new TextInputComponent()
                .setCustomId('gamename')
                .setLabel("Write your in Game Name")
                .setStyle('SHORT')
                .setPlaceholder('Ex: GNee')
                .setRequired(true)
                .setMaxLength(15)
                .setMinLength(3)

            const firstActionRow = new MessageActionRow()
                .addComponents(firstLine);

            const secondActionRow = new MessageActionRow()
                .addComponents(secondLine);

            modal.addComponents(firstActionRow, secondActionRow)

            collector.on('collect', async (i) => {
                if (i.isButton()) {
                    if (i.customId === 'yes') {
                        await i.showModal(modal)
                    } else if (i.customId === 'no') {
                        await i.update({ content: 'Registration process got cancelled!', components: [], embeds: [] });
                    };
                }
            });

            collector.on('end', async (collected, reason) => {
                if (reason === "time") {
                    msg.edit({ components: [anotherRowDisabled] })
                }
            })

        } catch (err) {
            console.log(err)
            // return interaction.editReply("Oops!! An Error Occurred, If you are seeing this message please notify the developer team.");
        }
    }
}