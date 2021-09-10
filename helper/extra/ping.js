const Config = require('../../Config');


module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "ping") {
        message.reply('!Pong');
    }
}