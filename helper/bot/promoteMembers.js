const Config = require('../../Config');
const {
    MessageMedia
} = require('whatsapp-web.js');

module.exports = async (message, chat) => {
    try {
        if (message.body.startsWith(Config.SUFFIX + "promote") ) {
            let to_promote = [message.mentionedIds[0]];
            if (message.hasQuotedMsg) {
                let msgObj = await message.getQuotedMessage();
                if (msgObj.author === undefined) {
                    to_promote = [msgObj.from];
                } else {
                    to_promote = [msgObj.author];
                }

            }

            let admins = [];
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
            }
            if (admins.includes(message.author) && admins.includes(message.to)) {
                if (message.author === to_promote[0]) {
                    message.reply("Trying to Promote Yourself Huh ??");

                } else if (admins.includes(to_promote[0]) && message.to !== to_promote[0]) {
                    message.reply("Already an *Admin*");
                } else if (message.to === to_promote[0]) {
                    message.reply("*Doge* ez already an *Admin*");
                } else if (message.author !== to_promote[0]) {
                    const promoted_by_mention = await message.getContact();
                    await chat.promoteParticipants(to_promote);
                    let promoted_member_mention = {
                        id: {
                            _serialized: to_promote[0]
                        }
                    }
                    chat.sendMessage(`Successfully Promoted @${to_promote[0].replace('@c.us','')}\nBy : @${promoted_by_mention.number}!`, {
                        mentions: [promoted_member_mention, promoted_by_mention],
                        quotedMessageId: message.id._serialized
                    });
                }
            } else if (!admins.includes(message.author)) {
                message.reply("Only Admins can perform this Action");
            } else if (!admins.includes(message.to)) {
                message.reply("Make *Doge* Admin to use this Command");
                const sticker = MessageMedia.fromFilePath('./dogeImages/doge-cry.jpg');
                chat.sendMessage(sticker, {
                    sendMediaAsSticker: true,
                    stickerAuthor: Config.STICKER_AUTHOR,
                    stickerName: Config.STICKER_NAME
                });
            }
        }
    } catch {
        //
    }


}
