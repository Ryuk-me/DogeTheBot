const Config = require('../../Config');
const fs = require('fs');
const axios = require('axios');
const {
    MessageMedia
} = require('whatsapp-web.js');
const COOLDOWN = require('../utils/commandTimeout');

module.exports = async (message, chat, isGroupAuth) => {
    if (message.body === Config.SUFFIX + "meme" || message.body === Config.SUFFIX + "18meme") {
        let data = await COOLDOWN.isTimeToMsg(isGroupAuth);
        let flag = data[0];
        let diff = data[1];
        if (flag || isNaN(diff)) {
            let memeSubReddit;
            if (message.body === Config.SUFFIX + "meme") {
                memeSubReddit = [
                    'IndianDankMemes',
                    'DankMemes',
                    'memes',
                    'CryingCatMemes',
                    'memeswithoutmods',
                    'Funnymemes',
                    'AnimeFunny',
                    'indiameme',
                    'desimemes',
                    'indianMeyMeys',
                    'KnowYourMeme',
                    'Flirtymemes',
                    'wholesomememes'
                ]
            } else if (message.body === Config.SUFFIX + "18meme" && isGroupAuth.NSFW) {
                memeSubReddit = [
                    'DirtyMemes',
                    'AdultMemes',
                    'PornMemes',
                    'SexualMemes',
                    'NSFWFunny',
                ]
            } else if (!isGroupAuth.NSFW && message.body === Config.SUFFIX + "18meme") {
                message.reply("Please Enable *NSFW*");
                return;
            }
            var subReddit = memeSubReddit[Math.floor(Math.random() * memeSubReddit.length)];
            let res = await axios.get("https://meme-api.herokuapp.com/gimme/" + subReddit);
            let fileName = res.data.url.split('/').slice(-1)[0];
            let downloadLink = res.data.preview.slice(-1)[0];
            const writer = fs.createWriteStream(fileName);

            const response = await axios({
                url: downloadLink,
                method: 'GET',
                responseType: 'stream'
            })

            response.data.pipe(writer)

            const waitFor = new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
            });
            waitFor.then(() => {
                const photo = MessageMedia.fromFilePath(fileName);
                chat.sendMessage(photo, {
                    quotedMessageId: message.id._serialized,
                    caption: res.data.title
                })
                try {
                    fs.unlinkSync(fileName);
                } catch {
                    //
                }
            })
            await COOLDOWN.addNewCoolDownTime(isGroupAuth);
        } else {
            message.reply("*[COOLDOWN]*\n\nWait : " + (Config.COMMAND_TIMEOUT - diff).toString() + ` ${Config.COMMAND_TIMEOUT - diff > 1 ? 'seconds' : 'second'} before using another command`);
        }
    }

}