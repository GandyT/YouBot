/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");

module.exports = {
    names: ["disable"],
    desc: "bot stops listening to you and deletes all your data",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (!Data.userExists(message.author.id)) return message.channel.send("Already Disabled");
        Data.removeUser(message.author.id);
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**GOODBYE**")
                .setDescription("All your messages have been deleted. We will no longer listen to your messages")
        );
    }
}