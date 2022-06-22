exports.run = async (bot, message, args) => {
    message.channel.send("**Comment faire fonctionner le bot ?**\n\n```yaml\n1. Pour que tout se déroule corrèctement, donnez au bot la permissions Administrateur\n2. Créez un salon textuel nommé bs\n3. Faites la commande !init dans le salon bs\n4. Cette commande va dans un premier temps supprimer tous les salons, roles et émojis présent sur votre serveur, veillez donc à les enregistrer quelque part avant de faire la commande!\n5. Dans un second temps, le bot va crée des roles, emojis et salons\n```Serveur support : https://discord.gg/HZNdnxKrfk \n_Brawl Stars Bot V1.0_")
}

exports.help = {
    name:"help",
}