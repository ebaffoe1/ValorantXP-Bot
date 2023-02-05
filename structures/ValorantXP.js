const { Client, Collection } = require('discord.js');
const Util = require('./Util');

const { PREFIX } = require('../config')

module.exports = class ValorantXP extends Client {
    constructor(options = {}) {
        super({
            partials: ['MESSAGE', 'REACTION'],
            presence: {
                status: 'online',
                activities: [
                    { name: `you play matches! | /help`, type: 'WATCHING' }
                ]
            },
            intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS'],
            restRequestTimeout: 120000
        });

        this.validate(options);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();
        this.images = new Map();
        this.utils = new Util(this);
        this.mongoose = require('./mongoose');
    };

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

        if (!options.TOKEN) throw new Error('You must pass the token for the bot.');
        this.token = options.TOKEN;

        if (!options.PREFIX) throw new Error('You must pass a prefix for the bot.');
        if (typeof options.PREFIX !== 'string') throw new TypeError('Prefix should be a type of String.');
        this.prefix = options.PREFIX;
    };

    async start(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        this.mongoose.init();
        super.login(token);
    };
};