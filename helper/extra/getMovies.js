const Config = require('../../Config');


module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + "movie") {
        let msg_to_send = "Bot doesnt Share movies on whatsapp\nTo watch / download movies join our telegram channel\n" + "https://t.me/joinchat/dx-3eSgwPQE5Y2I1";
        chat.sendMessage(msg_to_send, {
            quotedMessageId: message.id._serialized,
            linkPreview: true
        })
    }
}