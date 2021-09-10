const fs = require('fs');
const {
    Client
} = require('whatsapp-web.js');
const about = require('./helper/extra/about');
const promote = require('./helper/bot/promoteMembers');
const demote = require('./helper/bot/demoteMembers');
const tagEveryone = require('./helper/bot/tagEveryone');
const sticker = require('./helper/bot/makeSticker');
const textToSpeech = require('./helper/bot/textToSpeech');
const help = require('./helper/extra/help');
const getGroupDetails = require('./helper/bot/getGroupDetails');
const authGroup = require('./helper/bot/authGroup');
const deauthGroup = require('./helper/bot/deauthGroup');
const ID = require('./model/group');
const NSFW = require('./helper/bot/nsfw');
const checkGroupStatus = require('./helper/extra/getGroupStatus');
const banMembers = require('./helper/bot/banMembers');
const addMembers = require('./helper/bot/addParticipant');
const muteBot = require('./helper/bot/muteChat');
const github = require('./helper/extra/sourceCode');
const adminOnly = require('./helper/extra/adminOnlygroup');
const setGroupDescription = require('./helper/extra/setGroupDescription');
const onGroupJoined = require('./helper/extra/onGroupJoin');
const contactMe = require('./helper/extra/contactOwner');
const getMeme = require('./helper/extra/getMeme');
const forward = require('./helper/extra/forwardMessageToAllGroupOwnerOnly');
const codingPlayGround = require('./helper/extra/codingPlayground');
const getMessageCount = require('./helper/extra/getMessageCount');
const increaseMessageCount = require('./helper/extra/addMessageCountToDb');
const getUptime = require('./helper/utils/uptime');
const allAuthGroups = require('./helper/extra/authorisedGroupList');
const getMovies = require('./helper/extra/getMovies');
const searchImage = require('./helper/extra/searchImage');
const donate = require('./helper/extra/donate');
const slapper = require('./helper/extra/slapper');
const ping = require('./helper/extra/ping');
const unmute = require('./helper/bot/unmute');
const deleteMessage = require('./helper/extra/deleteMessage');


require('./database/__init__');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    qrTimeoutMs: 0,
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict"
        ]
    },
    session: sessionData,
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    console.log("Vist this site :  https://www.the-qrcode-generator.com/  and enter code and scan the qr with your whatsapp");
});

client.on('ready', () => {
    console.log('Client is ready!');
    onGroupJoined(client);
});


client.on('message', async msg => {
    let chat = await msg.getChat();
    const isGroupAuth = await ID.findOne({
        id: chat.id._serialized
    });
    if (chat.isGroup && isGroupAuth !== null && !chat.isMuted && !chat.isReadOnly) {
        await promote(msg, chat);
        await demote(msg, chat);
        await tagEveryone(msg, chat, client);
        await sticker(msg, chat, isGroupAuth);
        await textToSpeech(msg, chat, client, isGroupAuth);
        await help(msg, chat, isGroupAuth);
        await getGroupDetails(msg, chat);
        await NSFW.nsfw_auth(msg, chat);
        await NSFW.nsfw_deauth(msg, chat);
        await checkGroupStatus(msg, isGroupAuth);
        await banMembers(msg, chat);
        await addMembers(msg, chat, client);
        await muteBot(msg, chat);
        await github(msg, chat);
        await adminOnly(msg, chat);
        await deleteMessage(msg, chat);
        await setGroupDescription(msg, chat);
        await contactMe(msg, chat);
        await getMeme(msg, chat, isGroupAuth);
        await codingPlayGround(msg, chat, client);
        await getMessageCount(msg, chat, client);
        await increaseMessageCount(msg, chat.archive, isGroupAuth);
        await getMovies(msg, chat);
        await searchImage(msg, chat, isGroupAuth);
        await donate(msg, chat);
        await slapper(msg, chat, client, isGroupAuth);
        await ping(msg, chat);
        await getUptime(msg);

    } else if (isGroupAuth !== null && chat.isMuted && !chat.isReadOnly && chat.isGroup) {
        await unmute(msg, chat);
    } else if (isGroupAuth === null && !chat.isMuted && !chat.isReadOnly && chat.isGroup) {
        await getGroupDetails(msg, chat);
        await checkGroupStatus(msg, isGroupAuth);
        await contactMe(msg, chat);
    }
    // OWNER ONLY FUNCTIONS
    await forward(msg, chat, client);
    await authGroup(msg, chat, client);
    await deauthGroup(msg, chat, client);
    await allAuthGroups(msg);
});


client.initialize();