const Event = require('../../structures/Event');
const queue = new Map();

module.exports = class messageCreate extends Event {
    constructor(...args) {
        super(...args, {
        });
    };

    async run(message) {

        try {

            if (!message.guild || message.author.bot || !message.content.startsWith(this.bot.prefix)) return;

            const [cmd, ...args] = message.content.slice(this.bot.prefix.length).split(/ +/g);

            let ops = {
                queue: queue,
            }

            const command = this.bot.commands.get(cmd.toLowerCase()) || this.bot.commands.get(this.bot.aliases.get(cmd.toLowerCase()));


            if (command) {
                command.run(message, args, ops);
            }

        } catch (e) {
            console.log(e)
        }
    }
}