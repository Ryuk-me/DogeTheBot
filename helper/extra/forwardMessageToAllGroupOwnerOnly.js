/* 

This command will forward message to all group  
Only Owner Can use this command

What is use of the command ?
You can send changelog to all group.

*/

const Config = require('../../Config');
const ID = require('../../model/group');

module.exports = async (message, chat, client) => {
    if (message.body === Config.SUFFIX + "forward" && (message.author === Config.ADMIN + "@c.us" || message.from === Config.ADMIN + "@c.us") && message.hasQuotedMsg) {
        let quotedMsg = await message.getQuotedMessage();
        const allAuthgroup = await ID.find({});
        if (allAuthgroup !== null) {
            let allAuthgroupArray = [];
            for (let i = 0; i < allAuthgroup.length; i++) {
                allAuthgroupArray.push(allAuthgroup[i].id);
            }
            if (quotedMsg.hasMedia) {
                const attachmentData = await quotedMsg.downloadMedia();
                allAuthgroupArray.forEach(element => {
                    client.sendMessage(element, attachmentData, {
                        caption: `${quotedMsg.body !== '' ? quotedMsg.body : ''}`
                    });
                });
                message.reply("Message Forwarded Successfully\n*[Contains Media]*");
            } else {
                let linkPreview = false
                if (quotedMsg.body.includes('http://') || quotedMsg.body.includes('https://')) {
                    linkPreview = true;
                }
                allAuthgroupArray.forEach(element => {
                    client.sendMessage(element, quotedMsg.body, {
                        linkPreview: linkPreview
                    });
                });
                message.reply("Message Forwarded Successfully");
            }
        } else {
            message.reply("No Group has been authorized yet.")
        }

    }
}