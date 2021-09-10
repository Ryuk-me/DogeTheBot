const Config = require('../../Config');
const {
    MessageMedia
} = require('whatsapp-web.js');

module.exports = async (message, chat) => {
    try {
        if (message.body.startsWith(Config.SUFFIX + "ban") ) {
            let to_ban = [message.mentionedIds[0]];
            if (message.hasQuotedMsg) {
                let msgObj = await message.getQuotedMessage();
                if (msgObj.author === undefined) {
                    to_ban = [msgObj.from];
                } else {
                    to_ban = [msgObj.author];
                }

            }

            let admins = [];
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
            }
            if (admins.includes(message.author) && admins.includes(message.to) && to_ban[0] !== chat.owner._serialized) {
                if (message.author === to_ban[0]) {
                    message.reply("Trying to Ban Yourself Huh ??");
                } else if (message.to === to_ban[0]) {
                    message.reply("*Doge* Cant Ban *Doge*");
                    const sticker = MessageMedia.fromFilePath('./dogeImages/exit-doge.jpg');
                    chat.sendMessage(sticker, {
                        sendMediaAsSticker: true,
                        stickerAuthor: Config.STICKER_AUTHOR,
                        stickerName: Config.STICKER_NAME
                    });
                } else if (message.author !== to_ban[0]) {
                    const banned_by_mention = await message.getContact();
                    await chat.removeParticipants(to_ban);
                    let banned_member_mention = {
                        id: {
                            _serialized: to_ban[0]
                        }
                    }
                    chat.sendMessage(`Successfully Banned @${to_ban[0].replace('@c.us','')}\nBy : @${banned_by_mention.number}!`, {
                        mentions: [banned_member_mention, banned_by_mention],
                        quotedMessageId: message.id._serialized
                    });
                }
            } else if (!admins.includes(message.author)) {
                message.reply("Only Admins can perform this Action");
            } else if (!admins.includes(message.to)) {
                message.reply("Make *Doge* Admin to use this Command");
            } else if (to_ban[0] === chat.owner._serialized && message.author === to_ban[0]) {
                message.reply(`You are a Superadmin (creator of this Group) so *Doge* can't Ban you`);
                const sticker = MessageMedia.fromFilePath('./dogeImages/admin-pranam.jpg');
                chat.sendMessage(sticker, {
                    sendMediaAsSticker: true,
                    stickerAuthor: Config.STICKER_AUTHOR,
                    stickerName: Config.STICKER_NAME
                });
            } else if (to_ban[0] === chat.owner._serialized) {
                let superAdmin_mention = {
                    id: {
                        _serialized: to_ban[0]
                    }
                }
                chat.sendMessage(`@${to_ban[0].replace('@c.us','')}! is a Superadmin *Doge* can't demote`, {
                    mentions: [superAdmin_mention],
                    quotedMessageId: message.id._serialized
                });
            }
        }
    } catch {
        //
    }


}