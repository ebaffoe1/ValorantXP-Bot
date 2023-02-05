const Event = require('../../structures/Event');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { REGIONS, API_KEY } = require("../../config")
const axios = require("axios")

const user = require("../../structures/models/User")

module.exports = class interactionCreate extends Event {
    constructor(...args) {
        super(...args)
    };
    async run(interaction) {

        if (interaction.isCommand()) {

            const command = this.bot.commands.get(interaction.commandName.toLowerCase());

            if (command) {
                command.interactionRun(interaction);
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'myModal') {

                let firstLine = interaction.fields.getTextInputValue('tagline');
                let secondLine = interaction.fields.getTextInputValue('gamename');

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('region')
                            .setPlaceholder('Select your server region')
                            .addOptions([
                                {
                                    label: `${REGIONS[0].name}`,
                                    description: `Choose the region ${REGIONS[0].name}`,
                                    value: `${REGIONS[0].code}`,
                                    emoji: `${REGIONS[0].icon}`
                                },
                                {
                                    label: `${REGIONS[1].name}`,
                                    description: `Choose the region ${REGIONS[1].name}`,
                                    value: `${REGIONS[1].code}`,
                                    emoji: `${REGIONS[1].icon}`
                                },
                                {
                                    label: `${REGIONS[2].name}`,
                                    description: `Choose the region ${REGIONS[2].name}`,
                                    value: `${REGIONS[2].code}`,
                                    emoji: `${REGIONS[2].icon}`
                                },
                                {
                                    label: `${REGIONS[3].name}`,
                                    description: `Choose the region ${REGIONS[3].name}`,
                                    value: `${REGIONS[3].code}`,
                                    emoji: `${REGIONS[3].icon}`
                                },
                                {
                                    label: `${REGIONS[4].name}`,
                                    description: `Choose the region ${REGIONS[4].name}`,
                                    value: `${REGIONS[4].code}`,
                                    emoji: `${REGIONS[4].icon}`
                                },

                            ]),
                    );
                let getData
                try {
                    getData = await axios({
                        method: 'get',
                        url: `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${secondLine}/${firstLine}`,
                        headers: { "X-Riot-Token": `${API_KEY}` }
                    })

                } catch (error) {
                    if (error.config.data === undefined) return interaction.reply('Can not find any account with this name or tag!')
                }

                const msg = await interaction.reply({ components: [row], embeds: [], fetchReply: true, content: 'Choose a server region from down below!' });
                const collector = msg.createMessageComponentCollector({ time: 300000 });

                async function insertData(regionName, tagline, inGameName, valoRank) {
                    const data = {
                        discordId: interaction.user.id,
                        baseXp: 190,
                        gameLineTag: tagline,
                        inGameName: inGameName,
                        verification: {},
                        activeWizard: "null",
                        unCountedMatches: [],
                        region: regionName,
                        performance: {
                            win: 0,
                            lose: 0,
                            draw: 0
                        },
                        rank: "unrated",
                        valorantRank: valoRank
                    }
                    await user.insertMany(data)
                }

                collector.on('collect', async (i) => {
                    if (i.isSelectMenu()) {
                        let value = i.values

                        let searchArray = REGIONS.filter(r => r.code === value[0])

                        const embed = new MessageEmbed()
                        embed.setColor('#fa4454')
                        embed.setDescription(`So do you want to confirm your registration ?\n\nTagLine: **${firstLine}**\nIn-Game-Name: **${secondLine}**\nRegion: **${searchArray[0].name}**`)
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

                        await i.update({ embeds: [embed], components: [anotherRow], content: null })
                    }

                    if (i.isButton()) {
                        if (i.customId === 'yes') {
                            await i.update({ embeds: [], components: [], content: 'Registration done!' })

                        }
                    }
                });







            }
        }
    }
}