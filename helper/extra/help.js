const Config = require('../../Config');

module.exports = async (message, chat, isGroupAuth) => {
    if (message.body === Config.SUFFIX + "help") {
        let nsfwMemeCommand = `\n${Config.SYMBOL} ${Config.SUFFIX}18meme ${Config.ARROW_SYMBOL} to get a random adult meme *[NSFW]*\n`
        let helpMsg =
            `
${Config.SYMBOL} ${Config.SUFFIX}help ${Config.ARROW_SYMBOL} to see how to use\n
${Config.SYMBOL} ${Config.SUFFIX}info ${Config.ARROW_SYMBOL} to see group info or send this msg to Owner of the Bot to get authorization\n
${Config.SYMBOL} ${Config.SUFFIX}ping ${Config.ARROW_SYMBOL} to check bot is active or not\n
${Config.SYMBOL} ${Config.SUFFIX}sticker ${Config.ARROW_SYMBOL} reply to media / caption (limit 5 sec)\n
${Config.SYMBOL} ${Config.SUFFIX}tag ${Config.ARROW_SYMBOL} <some msg (optional)> it will tag everyone in the group either reply or direct send a message [ADMIN ONLY] (please dont reply to very old message you may not get any response back)\n   
${Config.SYMBOL} ${Config.SUFFIX}slap ${Config.ARROW_SYMBOL} <some text> (tagging wont work)\n
${Config.SYMBOL} ${Config.SUFFIX}delete ${Config.ARROW_SYMBOL} reply to the bot's message you want to delete\n
${Config.SYMBOL} ${Config.SUFFIX}promote ${Config.ARROW_SYMBOL} <tag someone> or reply to someone's msg you want to promote (Bot Must be Admin)\n
${Config.SYMBOL} ${Config.SUFFIX}demote ${Config.ARROW_SYMBOL} <tag someone> or reply to someone's msg you want to demote (Bot Must be Admin)\n
${Config.SYMBOL} ${Config.SUFFIX}add ${Config.ARROW_SYMBOL} <phone number with country code except (+)> or reply to a contact number or reply to a vcard(Bot Must be Admin)\n
${Config.SYMBOL} ${Config.SUFFIX}ban ${Config.ARROW_SYMBOL} <tag someone> or reply to someone's msg you want to ban (Bot Must be Admin)\n
${Config.SYMBOL} ${Config.SUFFIX}audio ${Config.ARROW_SYMBOL} <some text> to convert text to audio\n
${Config.SYMBOL} ${Config.SUFFIX}search ${Config.ARROW_SYMBOL} <some text> to search related image\n
${Config.SYMBOL} ${Config.SUFFIX}count ${Config.ARROW_SYMBOL} to get number of messages by each participant\n
${Config.SYMBOL} ${Config.SUFFIX}meme ${Config.ARROW_SYMBOL} to get a random meme\n${isGroupAuth.NSFW ? nsfwMemeCommand : ''}
${Config.SYMBOL} ${Config.SUFFIX}movie ${Config.ARROW_SYMBOL} to get movies\n
${Config.SYMBOL} ${Config.SUFFIX}nsfwauth ${Config.ARROW_SYMBOL} to enable nsfw\n
${Config.SYMBOL} ${Config.SUFFIX}nsfwdeauth ${Config.ARROW_SYMBOL} to disable nsfw\n
${Config.SYMBOL} ${Config.SUFFIX}status ${Config.ARROW_SYMBOL} to check Group authorization and NSFW status\n
${Config.SYMBOL} ${Config.SUFFIX}uptime ${Config.ARROW_SYMBOL} to check Bot's uptime\n
${Config.SYMBOL} ${Config.SUFFIX}adminonly ${Config.ARROW_SYMBOL} only allow admins to send messages(u have to manually change it back)\n
${Config.SYMBOL} ${Config.SUFFIX}setdesc ${Config.ARROW_SYMBOL} <some description> or reply to a message (to change group description)\n
${Config.SYMBOL} ${Config.SUFFIX}mute ${Config.ARROW_SYMBOL} <time in minutes e.g 1> mute bot for 'N' minutes (maximum time to mute is 300 minutes (5 hours))\n
${Config.SYMBOL} ${Config.SUFFIX}unmute ${Config.ARROW_SYMBOL} to unmute the chat\n
${Config.SYMBOL} ${Config.SUFFIX}c ${Config.ARROW_SYMBOL} reply to a file or reply to a code (you can only run basic code and try not to include package)\n
${Config.SYMBOL} ${Config.SUFFIX}python ${Config.ARROW_SYMBOL} reply to a file or reply to a code (you can only run basic code and try not to include package)\n
${Config.SYMBOL} ${Config.SUFFIX}node ${Config.ARROW_SYMBOL} reply to a file or reply to a code (you can only run basic code and try not to include package)\n
${Config.SYMBOL} ${Config.SUFFIX}contact ${Config.ARROW_SYMBOL} you will get a link to contact Owner\n
${Config.SYMBOL} ${Config.SUFFIX}github ${Config.ARROW_SYMBOL} to get source code of bot\n
${Config.SYMBOL} ${Config.SUFFIX}donate ${Config.ARROW_SYMBOL} to donate to owner\n
`
        message.reply(helpMsg);
    }
}