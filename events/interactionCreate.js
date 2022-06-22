const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    execute (interaction, bot) {
       if(interaction.isButton()) {
                if(interaction.customId === "yesRules") {
                    const rulesEmbed = new MessageEmbed()
                        .setAuthor({
                            name: `${interaction.guild.name}`,
                            iconURL: `https://static.wikia.nocookie.net/brawlstars/images/1/1c/Brawl_Icon.png/revision/latest?cb=20181010203524`
                        })
                        .setColor('YELLOW')
                        .setDescription("Voici le règlement du serveur discord, s'il vous plait respectez les.")
                        .addFields([
                            {name: "Général", value: "Pas de pseudos vides. - Aucun pseudos inapproprié. - Pas de pseudos sexuellement explicites. - Pas de pseudos offensants. - Pas de pseudos avec Unicode inhabituel ou illisible."}
                        ])
                        .setImage("https://jeu-bayrou.com/wp-content/uploads/2021/07/1625585346_Codes-dechange-Brawl-Stars-juillet-2021-obtenez-des-pieces-des.jpg")
                        .setThumbnail("https://www.jeumobi.com/wp-content/uploads/2020/11/icon-brawl-stars.png")
                        .setFooter({
                            text: "Règlement"
                        })
                    
                    interaction.message.delete()
                    interaction.channel.send({
                        embeds: [rulesEmbed]
                    })
                } else if(interaction.customId === "noRules") {
                    interaction.message.delete()
                } else if(interaction.customId === "play") {
                    const play = new MessageEmbed()
                        .setAuthor({
                            name: `${interaction.user.username}`
                        })
                        .setColor('RED')
                        .setThumbnail('https://i.ibb.co/XShyG7P/Darryl-In-Game.png')
                        .setDescription(`${interaction.user} veut jouer avec quelqu'un!\nAppuyez sur le bouton en dessous de ce message pour lui envoyer une notification`)
                        .setTimestamp()
                        .setFooter({
                            text: `${interaction.user.id}`
                        })

                    const playBtn = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('playbtn')
                            .setLabel('Jouer avec cette personne')
                            .setStyle('SUCCESS')
                    )
                    let playChannel = interaction.guild.channels.cache.find(c => c.name === "🏓〢jouer")
                    playChannel.send({
                        embeds: [play],
                        components: [playBtn]
                    })
                } else if(interaction.customId === "playbtn") {
                   try {
                    const playMember = interaction.message.embeds[0].footer?.text
                    const playSend = interaction.guild.members.cache.get(playMember)
                    playSend.send(`${interaction.user.username} veut jouer avec vous !`)
                    interaction.reply({
                        content: "Message bien envoyé!",
                        ephemeral: true
                    })
                   } catch (error) {
                        interaction.reply({
                            content: "Impossible d'envoyer un message privé à cette personne, sans doute car celle-ci à ses mp desactivés",
                            ephemeral: true
                        })
                   }
                } else if(interaction.customId === "yesTicket") {
                    interaction.message.delete()
                    
                    const ticketEmbed = new MessageEmbed()
                        .setAuthor({
                            name: `${interaction.guild.name}`,
                        })
                        .setColor('YELLOW')
                        .setDescription("Ouvrez un ticket en appuyant sur le bouton ci-dessous")
                        .setTitle("Ouvrir un ticket")
                        .setFooter({
                            text: "Ticket"
                        })
                    
                    const ticketBtn = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('openT')
                            .setLabel('Ouvrir')
                            .setStyle('PRIMARY')
                    )

                    interaction.channel.send({
                        embeds: [ticketEmbed],
                        components: [ticketBtn]
                    })
                } else if(interaction.customId === "noTicket") {
                    interaction.message.delete()
                } else if(interaction.customId === "openT") {
                    let ticketT = interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
                        type: 'GUILD_TEXT',
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [Permissions.FLAGS.VIEW_CHANNEL]
                            }, {
                                id: interaction.user,
                                allow: [Permissions.FLAGS.VIEW_CHANNEL]
                            }
                        ]
                    })

                    if(ticketT) {
                        interaction.reply({
                            ephemeral: true,
                            content: `Un ticket en votre nom a été crée!`
                        })
                    }
                }
       }
    }
}