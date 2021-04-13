/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");

module.exports = {
    names: ["enable", "e"],
    desc: "the bot will start collecting data about how you speak.",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (Data.userExists(message.author.id))
            return message.channel.send("You already have this bot enabled.");
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**ENABLED**")
                .setDescription("Note: please refrain from spamming. this will provide inaccurate results")
        );
        Data.addUser(message.author.id);
    }
}