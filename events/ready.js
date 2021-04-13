const Discord = require('discord.js');

module.exports = {
    event: "ready",
    async execute() {
        const client = this;
        console.log(`${client.user.tag} successfully authenticated!`);
        client.user.setActivity(`Version ${process.env.VERSION}!`);
    }
}