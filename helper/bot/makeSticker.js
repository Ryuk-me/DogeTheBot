const Config = require('../../Config');
const COOLDOWN = require('../utils/commandTimeout');


module.exports = async (message, chat, isGroupAuth) => {
    if (message.body.startsWith(Config.SUFFIX + "sticker")) {
        let data = await COOLDOWN.isTimeToMsg(isGroupAuth);
        let flag = data[0];
        let diff = data[1];
        if (flag || isNaN(diff)) {
            let sticker = null;
            if (message.hasMedia && !message.hasQuotedMsg) {
                sticker = await message.downloadMedia();
            } else if (message.hasQuotedMsg) {
                let stickerObj = await message.getQuotedMessage();
                if (stickerObj.hasMedia) {
                    sticker = await stickerObj.downloadMedia();
                } else {
                    message.reply("Not a Media");
                    return;
                }
            }
            // Sticker limit is 5sec
            if (sticker !== null) {
                chat.sendMessage(sticker, {
                    quotedMessageId: message.id._serialized,
                    sendMediaAsSticker: true,
                    stickerAuthor: Config.STICKER_AUTHOR,
                    stickerName: Config.STICKER_NAME
                });
                await COOLDOWN.addNewCoolDownTime(isGroupAuth);
            }

        } else {
            message.reply("*[COOLDOWN]*\n\nWait : " + (Config.COMMAND_TIMEOUT - diff).toString() + ` ${Config.COMMAND_TIMEOUT - diff > 1 ? 'seconds' : 'second'} before using another command`);
        }

    }
}