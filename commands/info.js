/* EXTERNAL MODULES */
const Discord = require("discord.js");

module.exports = {
    names: ["info"],
    desc: "explains the bot!",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**INFO**")
                .setDescription("**How does this bot work?**\n\nThis bot takes in account the previous word you say to predict your next one, much like the predictive text feature on your phone.\n\n**Why is this bot stupid and saying weird stuff**\n\nsince it predicts what you're gonna say using the previous word, you're gonna need lots of data in your dictionary. also the more frequently you use a word the more likely the bot is going to use that word as well.")
        )
    }
}