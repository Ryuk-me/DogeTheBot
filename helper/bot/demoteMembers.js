const Config = require('../../Config');
const {
    MessageMedia
} = require('whatsapp-web.js');

module.exports = async (message, chat) => {
    try {
        if (message.body.startsWith(Config.SUFFIX + "demote") ) {
            let to_demote = [message.mentionedIds[0]];
            if (message.hasQuotedMsg) {
                let msgObj = await message.getQuotedMessage();
                if (msgObj.author === undefined) {
                    to_demote = [msgObj.from];
                } else {
                    to_demote = [msgObj.author];
                }

            }

            let admins = [];
            for (let i = 0; i < chat.participants.length; i++) {
                if (chat.participants[i].isAdmin) {
                    admins.push(chat.participants[i].id._serialized);
                }
            }
            if (admins.includes(message.author) && admins.includes(message.to) && to_demote[0] !== chat.owner._serialized) {
                if (message.author === to_demote[0]) {
                    message.reply("Trying to Demote Yourself Huh ??");
                } else if (!admins.includes(to_demote[0]) && message.to !== to_demote[0]) {
                    message.reply("Already Not an *Admin*");
                } else if (message.to === to_demote[0]) {
                    message.reply("*Doge* Cant demote *Doge*");
                    const sticker = MessageMedia.fromFilePath('./dogeImages/exit-doge.jpg');
                    chat.sendMessage(sticker, {
                        sendMediaAsSticker: true,
                        stickerAuthor: Config.STICKER_AUTHOR,
                        stickerName: Config.STICKER_NAME
                    });
                } else if (message.author !== to_demote[0]) {
                    const demoted_by_mention = await message.getContact();
                    await chat.demoteParticipants(to_demote);
                    let demoted_member_mention = {
                        id: {
                            _serialized: to_demote[0]
                        }
                    }
                    chat.sendMessage(`Successfully Demoted @${to_demote[0].replace('@c.us','')}\nBy : @${demoted_by_mention.number}!`, {
                        mentions: [demoted_member_mention, demoted_by_mention],
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
            } else if (to_demote[0] === chat.owner._serialized && message.author === to_demote[0]) {
                message.reply(`You are a Superadmin (creator of this Group) so *Doge* can't demote you`);
            } else if (to_demote[0] === chat.owner._serialized) {
                let superAdmin_mention = {
                    id: {
                        _serialized: to_demote[0]
                    }
                }
                chat.sendMessage(`@${to_demote[0].replace('@c.us','')}! is a Superadmin *Doge* can't demote`, {
                    mentions: [superAdmin_mention],
                    quotedMessageId: message.id._serialized
                });
            }
        }
    } catch {
        //
    }


}