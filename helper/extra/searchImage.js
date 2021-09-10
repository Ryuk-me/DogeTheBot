const Config = require('../../Config');
var gis = require('g-i-s');
const fs = require('fs');
const axios = require('axios');
const {
    MessageMedia
} = require('whatsapp-web.js');
const COOLDOWN = require('../utils/commandTimeout');
const Filter = require('bad-words');
const profanity = require("profanity-hindi");
const bad_words_hindi = require('../../bad-words/bad-word-1.json');

module.exports = async (message, chat, isGroupAuth) => {
    if (message.body.startsWith(Config.SUFFIX + "search")) {
        let data = await COOLDOWN.isTimeToMsg(isGroupAuth);
        let flag = data[0];
        let diff = data[1];
        if (flag || isNaN(diff)) {
            if (message.body.length > (Config.SUFFIX + 'search').length) {
                let text = null;
                text = message.body.split(Config.SUFFIX + 'search').join('').trim();

                if (text !== null && text !== undefined && text !== '') {
                    let filter = new Filter();
                    profanity.addWords(bad_words_hindi);
                    let isProfane_from_bad_words = filter.isProfane(text);
                    let isDirty = profanity.isMessageDirty(text);
                    if (((isDirty || isProfane_from_bad_words) && isGroupAuth.NSFW) || ((!isDirty && !isProfane_from_bad_words))) {

                        gis(text, logResults);

                        async function logResults(error, res) {
                            if (error) {
                                //
                            } else {
                                try {
                                    var obj = res[Math.floor(Math.random() * res.length)];
                                    let fileName = obj.url.split('/').slice(-1)[0];
                                    if (!fileName.endsWith('.jpg') || !fileName.endsWith('.png') || !fileName.endsWith('.jpeg')) {
                                        fileName = message.timestamp.toString() + ".png";
                                    }
                                    const writer = fs.createWriteStream(fileName);
                                    const response = axios({
                                        url: obj.url,
                                        method: 'GET',
                                        responseType: 'stream'
                                    }).then((response) => {
                                        response.data.pipe(writer);
                                    }).catch((err) => {

                                    });

                                    const waitFor = new Promise((resolve, reject) => {
                                        writer.on('finish', resolve)
                                        writer.on('error', reject)
                                    });

                                    waitFor.then(() => {
                                        const photo = MessageMedia.fromFilePath(fileName);
                                        chat.sendMessage(photo, {
                                            quotedMessageId: message.id._serialized,
                                            caption: text
                                        })

                                        try {
                                            fs.unlinkSync(fileName);
                                        } catch {
                                            //
                                        }
                                    })
                                    await COOLDOWN.addNewCoolDownTime(isGroupAuth);
                                } catch {
                                    message.reply("Try Again We faced some issue");
                                }
                            }

                        }

                    } else {
                        message.reply("Text Contains a bad word\nPlease Enable NSFW by command\n" + Config.SYMBOL + " " + Config.SUFFIX + "nsfwauth " + Config.ARROW_SYMBOL + " to enable nsfw\n\nThen only you can use this feature with bad words.");
                    }
                }
            }

        } else {
            message.reply("*[COOLDOWN]*\n\nWait : " + (Config.COMMAND_TIMEOUT - diff).toString() + ` ${Config.COMMAND_TIMEOUT - diff > 1 ? 'seconds' : 'second'} before using another command`);
        }


    }
}