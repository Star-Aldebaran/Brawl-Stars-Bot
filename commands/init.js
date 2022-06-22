const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js")

exports.run = async (bot, message, args) => {
    if(message.member.permissions.has('ADMINISTRATOR')) {
		await message.channel.send("``` Veuillez patienter quelques secondes... ```")

		let actualRateLimitTimeout = 0
		const sleep = (ms) => {
			return new Promise((resove, reject) => {
				setTimeout(() => {
					actualRateLimitTimeout = 0
					resove()
				}, ms)
			})
		}

		const { guild } = message

		const channels = await guild.channels.fetch().catch(console.error)
		if (channels) {
			for (let channel of channels) {
				channel = channel[1]

				await sleep(500 + actualRateLimitTimeout)

				if ((channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_CATEGORY' || channel.type === 'GUILD_VOICE') && channel.name != "bs") {
					const channelDelete = await channel.delete().catch(console.error)
					if (channelDelete) {
						console.log(`Salon supprimé : ${channel.name}`)
					}
				}
			}
		}

		await sleep(actualRateLimitTimeout)

		const roles = await guild.roles.fetch().catch(console.error)
		if (roles) {
			const botRole = roles.find((role) => role?.tags?.botId === bot.user.id)

			for (let role of roles) {
				role = role[1]

				await sleep(500 + actualRateLimitTimeout)

				if (!role.managed && role.id !== guild.id && role.comparePositionTo(botRole) < 0) {
					const roleDelete = await role.delete().catch(console.error)
					if (roleDelete) {
						console.log(`Role supprimé : ${roleDelete.name}`)
					}
				}
			}
		}

		await sleep(actualRateLimitTimeout)

		const emojis = await guild.emojis.fetch().catch(console.error)
		if (emojis) {
			for (let emoji of emojis) {
				emoji = emoji[1]

				await sleep(1000 + actualRateLimitTimeout)

				const emojiDelete = await emoji.delete().catch(console.error)
				if (emojiDelete) {
					console.log(`Emoji supprimé : ${emojiDelete.name}`)
				}
			}
		}

	await sleep(actualRateLimitTimeout)

	const tblRoles = [
		{
			color: `RED`,
			mentionable: false,
			name: `Administration`,
			permissions: `ADMINISTRATOR`,
			hoist: true
		},{
			color: `YELLOW`,
			mentionable: false,
			name: `Brawl Stars Bot`,
			permissions: `ADMINISTRATOR`,
			hoist: true
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Super modérateur`,
			permissions: `BAN_MEMBERS`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Modérateur`,
			permissions: `KICK_MEMBERS`,
			hoist: false
		},{
			color: `ORANGE`,
			mentionable: true,
			name: `Modération`,
			hoist: true
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Responsable evenements`,
			hoist: false
		},{
			color: `DARK_BLUE`,
			mentionable: false,
			name: `Community Manager`,
			hoist: true
		},{
			color: `FUCHSIA`,
			mentionable: false,
			name: `Partenaires`,
			hoist: false
		},{
			color: `BLUE`,
			mentionable: false,
			name: `Membres`,
			hoist: true
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `=====🏆=====`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Joue à Brawl Stars`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Possède un personnage légendaire`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `=====📢=====`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Evenements`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Sondages`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Annonces`,
			hoist: false
		},{
			color: `DEFAULT`,
			mentionable: false,
			name: `Partenariats`,
			hoist: false
		},{
			color: `GREY`,
			mentionable: false,
			name: `muted`,
			hoist: false
		}
	]

	await message.channel.send("``` Création des rôles ```")
		let newRoles = []
		for (let i = 0; i < tblRoles.length; i++) {
			const roleConfig = tblRoles[i]

			const newRole = await guild.roles.create(roleConfig).catch(console.error)
			await sleep(actualRateLimitTimeout)
			if (newRole) {
				newRoles.push(`<@&${newRole.id}>`)
			}
		}

		await message.channel.send(`✅ ${newRoles.length}/${tblRoles.length} rôles créés :\n${newRoles.join(' - ')}`).catch(console.error())
		if (newRoles.length < tblRoles.length) {
			await message.channel.send("⚠️ Des rôles n'ont pas pu être créés, \n \n**si vous voyez ce message, c'est qu'un problèmre à eu lieu, s'il vous plait, __contactez Aldebaran#9090 pour corriger ce problème__**").catch(console.error())
		}

	const tblEmojis = [
		{
			url: "https://png.monster/wp-content/uploads/2022/01/png.monster-217.png",
			name: "brawl"
		}, {
			url: "https://image.jeuxvideo.com/medias-sm/154793/1547934746-4766-artwork-tir-supercell-free-to-play.png",
			name: "leon"
		}, {
			url: "https://i.pinimg.com/originals/57/be/76/57be76fc0c5ded2cd23e2134b50c11bb.png",
			name: "frank"
		}, {
			url: "https://static.brawler.gg/images/portraits/shelly-portrait.3be52d59c3.png",
			name: "shelly"
		},
	]

	if (guild.iconURL() != null) {
		tblEmojis.push({
			url: guild.iconURL(),
			name: 'serveur'
		})
	} else {
		await message.channel.channel.send(`❌ Impossible de crée l'émoji **serveur** sans doute car votre serveur ne possède pas d'icon\n`)
	}

	await message.channel.send("``` Création des émojis ```")
		const newEmojis = []
		for (let i = 0; i < tblEmojis.length; i++) {
			const emojiConfig = tblEmojis[i]

			const newEmoji = await guild.emojis.create(emojiConfig.url, emojiConfig.name).catch(console.error)
			await sleep(actualRateLimitTimeout)
			if (newEmoji) {
				newEmojis.push(`<:${newEmoji.animated ? 'a:' : ''}${newEmoji.name}:${newEmoji.id}>`)
			}
		}

		await message.channel.send(`✅ ${newEmojis.length}/${tblEmojis.length} émojis créés :\n${newEmojis.join(', ')}`).catch(console.error())
		if (newEmojis.length < tblEmojis.length) {
			await message.channel.send("⚠️ Des émojis n'ont pas pu être créés, \n \n**si vous voyez ce message, c'est qu'un problèmre à eu lieu, s'il vous plait, __contactez Aldebaran#9090 pour corriger ce problème__**").catch(console.error())
		}

		await message.channel.send("``` Création des catégories et salons ```")

		const serverCategory = await message.guild.channels.create(`🟡 ${message.guild.name}`, {
			type: 'GUILD_CATEGORY',
			permissionOverwrites: [
				{
					id: message.guild.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL],
					deny: [Permissions.FLAGS.SEND_MESSAGES]
				}
			]
		})

		const chatCategory = await message.guild.channels.create('🟡 CHAT', {
			type: 'GUILD_CATEGORY',
			permissionOverwrites: [
				{
					id: message.guild.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL],
					deny: [Permissions.FLAGS.MENTION_EVERYONE]
				},
				{
					id: message.guild.roles.cache.find(mute => mute.name === "muted"),
					deny: [Permissions.FLAGS.SEND_MESSAGES]
				}
			]
		})

		const brawlCategory = await message.guild.channels.create(`🟡 BRAWL STARS`, {
			type: 'GUILD_CATEGORY',
			permissionOverwrites: [
				{
					id: message.guild.id,
					allow: [Permissions.FLAGS.VIEW_CHANNEL],
					deny: [Permissions.FLAGS.MENTION_EVERYONE]
				},
				{
					id: message.guild.roles.cache.find(mute => mute.name === "muted"),
					deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.SPEAK]
				}
			]
		})

		const staffCategory = await message.guild.channels.create(`🟡 STAFF`, {
			type: 'GUILD_CATEGORY',
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: [Permissions.FLAGS.VIEW_CHANNEL],
				},
				{
					id: message.guild.roles.cache.find(mod => mod.name === "Modération"),
					allow: [Permissions.FLAGS.VIEW_CHANNEL]
				}
			]
		})
		const tblChannels = [
			{
				name: "📜〢règlement",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			}, {
				name: "📢〢annonces",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			}, {
				name: "📊〢sondages",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "🗞〢roles-facultatifs",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "🎫〢ouvrir-un-ticket ",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "⭐〢actu-brawl-stars",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "🏓〢demander-a-jouer",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "🏓〢jouer",
				type: "GUILD_TEXT",
				parent: serverCategory.id
			},{
				name: "💬〢general",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			},{
				name: "📷〢images",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			},{
				name: "❓〢suggestions",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			},{
				name: "🤖〢commandes-bot",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			}, {
				name: "🏆〢recherche-club",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			}, {
				name: "🏆〢recrutement-club",
				type: "GUILD_TEXT",
				parent: chatCategory.id
			}, {
				name: "🌟〢Discussion brawl",
				type: "GUILD_TEXT",
				parent: brawlCategory.id
			}, {
				name: "🎤〢sans-micro",
				type: "GUILD_TEXT",
				parent: brawlCategory.id
			}, {
				name: "🌟〢duo",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢duo",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢duo",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢duo",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢duo",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢trio",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🌟〢tournoi",
				type: "GUILD_VOICE",
				parent: brawlCategory.id
			}, {
				name: "🦾〢discussion-staff",
				type: "GUILD_TEXT",
				parent: staffCategory.id
			}, {
				name: "🦾〢logs",
				type: "GUILD_TEXT",
				parent: staffCategory.id
			}, {
				name: "rapport",
				type: "GUILD_TEXT",
				parent: staffCategory.id
			},
		]

		const newChannels = []
		for (let i = 0; i < tblChannels.length; i++) {
			const channelConfig = tblChannels[i]

			const newChannel = await guild.channels.create(channelConfig.name, {
				type: `${channelConfig.type}`,
				parent: `${channelConfig.parent}`,
			})
			if (newChannel) {
				newChannels.push(`<#${newChannel.id}>`)
			}
		}

		await message.channel.send(`✅ ${newChannels.length}/${tblChannels.length} salons crées :\n${newChannels.join(' - ')}`).catch(console.error())
		if(newChannels.length < tblChannels.length) {
			await message.Channel.send("⚠️ Des salons n'ont pas pu être créés, \n \n**si vous voyez ce message, c'est qu'un problèmre à eu lieu, s'il vous plait, __contactez Aldebaran#9090 pour corriger ce problème__**").catch(console.error())
		}

		let rulesMsg = message.guild.channels.cache.find(c => c.name === "📜〢règlement")
		if(rulesMsg) {
			const rulesMsgBtns = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId("yesRules")
					.setLabel("Oui")
					.setStyle('SUCCESS'),

				new MessageButton()
					.setCustomId("noRules")
					.setLabel('Non')
					.setStyle('DANGER')
			)

			rulesMsg.send({
				content: "Cette template de serveur propose un règlement standard, voulez vous l'envoyer ?",
				components: [rulesMsgBtns]
			})

		let askingPlayChnl = message.guild.channels.cache.find(c => c.name === "🏓〢demander-a-jouer")
		const askingPlay = new MessageEmbed()
			.setAuthor({
				name: `Jouer à Brawl Stars`,
				iconURL: "https://www.jeumobi.com/wp-content/uploads/2020/11/icon-brawl-stars.png"
			})
			.setColor('RED')
			.setDescription("Demandez à jouer avec un autre membre du serveur en appuyant sur le bouton ci-dessous, cette action enverra directement un message dans le salon adéquat pour vous donner plus de visibilité !")
			.setThumbnail("https://static.wikia.nocookie.net/brawlstars/images/d/dc/Boss_Robot.png/revision/latest/scale-to-width-down/1200?cb=20200304205905")

		const askingPlayBtns = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('play')
				.setLabel('Jouer')
				.setStyle('SUCCESS')
		)

		askingPlayChnl.send({
			embeds: [askingPlay],
			components: [askingPlayBtns]
		})

		let rolesChannel = message.guild.channels.cache.find(c => c.name === "🗞〢roles-facultatifs")
		rolesChannel.send({
			content: "Pour les rôles facultatifs, nous vous conseillons d'ajouter sois le bot **Carl Bot** ou bien **Zira Bot**"
		})

		const askingTicketBtns = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('yesTicket')
				.setLabel('Oui')
				.setStyle('SUCCESS'),

			new MessageButton()
				.setCustomId('noTicket')
				.setLabel('Non')
				.setStyle('DANGER')
		)
		let ticketChannel = message.guild.channels.cache.find(c => c.name === "🎫〢ouvrir-un-ticket")
		ticketChannel.send({
			content: "Cette template de serveur possède un système de ticket, voulez vous l'ajouter ?",
			components: [askingTicketBtns]
		})
		}

		let reportChannel = message.guild.channels.cache.find(c => c.name === "rapport")
		reportChannel.send({
			content: "```yaml\nRapport de template du serveur discord **Brawl Stars**\nVoici le rapport de la template que vous venez d'initialiser, veuillez lire ce message en entier et attentivement.\n\n-Le salon `ds` ne sert plus à rien, libre à vous de le supprimé.\n-Les salons Règlement et Ouvrir un ticket s'activent selon vos envies, attention, il n'y à pas de retour en arrière possible.\n-Si vous n'utilisez pas le module ticket, nous vous recommandons d'utiliser le bot Ticket Tools.\n-Pour les rôles facultatifs, nous vous recommandons le bot Carl Bot.\n-Pour les logs, nous vous recommandons le bot Dyno\n```\nSi vous rencontrez un problème, que vous avez une question ou que vous apercevez un disfonctionnement, veuillez vous rendre sur le serveur support => https://discord.gg/HZNdnxKrfk \n _Brawl Stars Bot V1.0, made by Aldebaran#9090_"
		})
    }
}

exports.help = {
    name:"init",
}