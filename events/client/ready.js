const Event = require('../../structures/Event');
const { } = require('../../structures/functions');
const { loadImage } = require("canvas");
const path = require('path');

module.exports = class Ready extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        });
    };

    async run() {
        let data = [];

        for (const [key, value] of this.bot.commands) {
            data.push({ name: key, description: value.description, options: value.commandOptions });
        };

        await this.bot.application.commands.set(data); //takes an hour to update use `await this.bot.guilds.cache.get('id').commands.set(data);` for testing
        console.log(`${this.bot.user.username} is Online!`);


        const images = [
            "valorantImg.jpg"
        ];

        for (let i = 0; i < images.length; i++) {
            const buffer = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', images[i]));
            this.bot.images.set(i + 1, buffer);
        };

        console.log("All Images Loaded!")

    }
};