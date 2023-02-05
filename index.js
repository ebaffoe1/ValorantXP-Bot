const ValorantXP = require('./structures/ValorantXP');
const { TOKEN, PREFIX } = require('./config.js');

const bot = new ValorantXP({ TOKEN, PREFIX });
bot.start();