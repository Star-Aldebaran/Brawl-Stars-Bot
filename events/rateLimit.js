module.exports = {
    name: 'rateLimit',
    execute(rateLimit, bot) {
       console.log(`Veuillez patienter ${rateLimit.timeout} milisecondes...`);
    }
}