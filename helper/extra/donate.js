const Config = require('../../Config');

module.exports = async (message, chat) => {
    if (message.body === Config.SUFFIX + 'donate') {
        let msg_to_send = "Visit this link to Donate\n\nhttps://imgur.com/a/oQOWGRo";
        chat.sendMessage(msg_to_send, {
            quotedMessageId: message.id._serialized,
            linkPreview: true
        })
    } 
}