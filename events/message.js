const {userExists, addSentence} = require("../data.js");

module.exports = {
    event: "message",
    async execute(message) {
        const client = this;

        if (!message.author.bot || !message.guild) return;

        if (message.content.startsWith(process.env.PREFIX)) {
            var env = {
                message: message,
                args: message.content
                    .toLowerCase()
                    .substr(process.env.PREFIX.length)
                    .split(" "),
                client: client
            };

            var command = client.commands.find(env.args[0]);
            if (command) return command.execute(env);
        }

        if (userExists(message.author.id)) return addSentence(message.author.id, message.content);
    }
}