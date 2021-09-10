const gTTS = require('gtts');
const Config = require('../../Config');
const {
    MessageMedia
} = require('whatsapp-web.js');
const fs = require('fs');
const COOLDOWN = require('../utils/commandTimeout');


module.exports = async (message, chat, client, isGroupAuth) => {
    if (message.body.startsWith(Config.SUFFIX + "audio")) {
        let data = await COOLDOWN.isTimeToMsg(isGroupAuth);
        let flag = data[0];
        let diff = data[1];
        if (flag || isNaN(diff)) {
            let text = null;
            let message_id = message.id._serialized;
            let fileName = message.timestamp.toString() + ".mp3";
            if (message.body.length > (Config.SUFFIX + 'audio').length) {
                if (message.hasQuotedMsg) {
                    let msgObj = await message.getQuotedMessage();
                    await client.interface.openChatWindowAt(msgObj.id._serialized);
                    message_id = msgObj.id._serialized;
                }
                text = message.body.split(Config.SUFFIX + 'audio').join('').trim();
                if (message.mentionedIds.length > 0) {
                    message.mentionedIds.forEach(element => {
                        text = text.replace('@' + element.replace("@c.us", ""), '').trim();
                    });
                }
            }

            if (text !== null && text !== undefined && text.length > 0) {
                const waitFor = new Promise((resolve, reject) => {
                    var gtts = new gTTS(text, Config.LANGUAGUE);
                    gtts.save(fileName, function (err, result) {
                        if (err) {
                            throw new Error(err)
                        }
                        resolve();
                    })
                })
                waitFor.then(() => {
                    const audio = MessageMedia.fromFilePath(fileName);
                    chat.sendMessage(audio, {
                        quotedMessageId: message_id,
                        sendAudioAsVoice: true,
                    })
                    try {
                        fs.unlinkSync(fileName);
                    } catch (err) {
                        // 
                    }
                })
                await COOLDOWN.addNewCoolDownTime(isGroupAuth);
            } else {
                message.reply(`Please enter a message\n${Config.SYMBOL} ${Config.SUFFIX}audio How are You ?`);
            }

        } else {
            message.reply("*[COOLDOWN]*\n\nWait : " + (Config.COMMAND_TIMEOUT - diff).toString() + ` ${Config.COMMAND_TIMEOUT - diff > 1 ? 'seconds' : 'second'} before using another command`);
        }

    }

}