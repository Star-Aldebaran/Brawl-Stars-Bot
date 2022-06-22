module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        bot.user.setPresence({ activities: [{ name: "Brawl Stars"}] });
    }
}
