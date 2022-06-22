const { MessageEmbed } = require('discord.js');
const config = require('../config.json')

exports.run = async (bot, message, args) => {

    const random1 = new MessageEmbed()
        .setAuthor({
            name: `${message.author.username}`
        })
        .setColor('RANDOM')
        .setDescription("HTML")
        .setThumbnail("https://cutewallpaper.org/24/html-logo-png/22-html5-logo-png-icon-logo-design.png")
        .setTimestamp()
        .addFields([
            {name: "code", value:"\`\`\`html\n<h1>Hello World!</h1> \n\`\`\`", inline: true},
            {name: "explications", value: "Hello World en HTML", inline: true}
        ])

    const random2 = new MessageEmbed()
        .setAuthor({
            name: `${message.author.username}`
        })
        .setColor('RANDOM')
        .setDescription("JavaScript")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png")
        .setTimestamp()
        .addFields([
            {name: "code", value:"\`\`\`js\nconsole.log(\"Hello World!\") \n\`\`\`", inline: true},
            {name: "explications", value: "Hello World en JS", inline: true}
        ])

    const random3 = new MessageEmbed()
        .setAuthor({
            name: `${message.author.username}`
        })
        .setColor('RANDOM')
        .setDescription("PHP")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Webysther_20160423_-_Elephpant.svg/2560px-Webysther_20160423_-_Elephpant.svg.png")
        .setTimestamp()
        .addFields([
            {name: "code", value:"\`\`\`php\necho '<p>Hello <World!</p>' \n\`\`\`", inline: true},
            {name: "explications", value: "Hello World en PHP", inline: true}
        ])
        
    const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
    let choice = pickOne([random1, random2, random3]);

    message.channel.send({
        embeds: [choice]
    })
}

exports.help = {
    name:"random",
}