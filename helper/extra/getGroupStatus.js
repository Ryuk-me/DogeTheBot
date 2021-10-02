const Config = require('../../Config');

module.exports = async (message, gid) => {
    if (message.body === Config.SUFFIX + 'status' && gid !== null) {
        var statNSFW = 'Disabled';
        if (gid.NSFW) {
            statNSFW = 'Enabled'
        }
        message.reply('You are Authorized to use this *Bot*\n*NSFW* : ' + statNSFW);
    } else if (message.body === Config.SUFFIX + 'status' && gid === null) {
        message.reply(`You are not Authorized to use this *Bot*\nContact Owner to get access\nTo Contact Owner use command\n\n${Config.SYMBOL} ${Config.SUFFIX}contact ${Config.ARROW_SYMBOL} you will get a link to contact Owner\n`);
    }
}