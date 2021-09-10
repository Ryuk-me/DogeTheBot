const Config = require('../../Config');

const {
    MessageMedia
} = require('whatsapp-web.js');
const fs = require('fs');
const Jimp = require("jimp");
const COOLDOWN = require('../utils/commandTimeout');

module.exports = async (message, chat, client, isGroupAuth) => {
    if (message.body.startsWith(Config.SUFFIX + "slap")) {
        let data = await COOLDOWN.isTimeToMsg(isGroupAuth);
        let flag = data[0];
        let diff = data[1];
        if (flag || isNaN(diff)) {
            let text = null;
            let message_id = message.id._serialized;
            let fileName = message.timestamp.toString() + ".png";
            if (message.body.length > (Config.SUFFIX + 'slap').length) {
                if (message.hasQuotedMsg) {
                    let msgObj = await message.getQuotedMessage();
                    await client.interface.openChatWindowAt(msgObj.id._serialized);
                    message_id = msgObj.id._serialized;
                }
                text = message.body.split(Config.SUFFIX + 'slap').join('').trim();

            }

            if (text !== null && text !== undefined && text.length > 0) {
                const image = await Jimp.read('./slapimage/slap-org.png');
                const font = await Jimp.loadFont('./font/newtext.fnt');
                image
                    .print(
                        font,
                        0,
                        -15, {
                            text: text,
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                        },
                        image.bitmap.width,
                        image.bitmap.height
                    )
                image.writeAsync(fileName).then(() => {
                    chat.sendMessage(MessageMedia.fromFilePath(fileName), {
                        quotedMessageId: message_id,
                        sendMediaAsSticker: true,
                        stickerAuthor: Config.STICKER_AUTHOR,
                        stickerName: Config.STICKER_NAME
                    });
                    try {
                        fs.unlinkSync(fileName);
                    } catch {

                    }
                }).catch((err) => {

                });
                await COOLDOWN.addNewCoolDownTime(isGroupAuth);
            } else {
                message.reply(`Please enter a text`);
            }
        } else {
            message.reply("*[COOLDOWN]*\n\nWait : " + (Config.COMMAND_TIMEOUT - diff).toString() + ` ${Config.COMMAND_TIMEOUT - diff > 1 ? 'seconds' : 'second'} before using another command`);
        }


    }

}