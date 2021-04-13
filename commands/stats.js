/* EXTERNAL MODULES */
const Discord = require("discord.js");
const Data = require("../data.js");

module.exports = {
    names: ["stats"],
    desc: "gets your stats",
    async execute(env) {
        /** 
         * @param  {Discord.Message} message
         * @param  {Array} args
         * @param  {Discord.Client} client
        */
        const { message, args, client } = env; // Variables
        if (!Data.userExists(message.author.id)) return message.channel.send("You do not have any data.");

        var user = Data.getUser(message.author.id);
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("**STATS**")
                .setDescription(`Dictionary - ${Object.keys(user).length} words`)
        );
    }
}