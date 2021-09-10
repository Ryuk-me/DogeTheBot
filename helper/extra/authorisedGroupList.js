const Config = require('../../Config');
const countMessage = require('../../model/messagecount');

/*
    Only owner of the bot can use this command
*/
module.exports = async (message) => {
    if (message.body === Config.SUFFIX + "allgroup" && (message.author === Config.ADMIN + "@c.us" || message.from === Config.ADMIN + "@c.us")) {
        let allGroups = await countMessage.find({});
        let allGroupList = [];
        if (allGroups.length > 0) {
            for (let i = 0; i < allGroups.length; i++) {
                let obj = {};
                obj.Name = allGroups[i].name;
                obj.ID = allGroups[i].id;
                obj.Messages = allGroups[i].totalMessage;
                allGroupList.push(obj);
            }

            message.reply(`${JSON.stringify(allGroupList,null," ")}`);
            message.reply("Total Group Authorised : ", allGroups.length);
        } else {
            message.reply("Empty");
        }

    }
}