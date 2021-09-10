const Config = require('../../Config');

const {
    c,
    cpp,
    node,
    python,
} = require('compile-run');
const fs = require('fs');


module.exports = async (message, chat, client) => {

    if (message.body === Config.SUFFIX + "c" || message.body === Config.SUFFIX + "python" || message.body === Config.SUFFIX + "node" && message.hasQuotedMsg) {
        let command = message.body.split(Config.SUFFIX)[1];
        if (command === 'python') {
            command = 'py';
        } else if (command === 'node') {
            command = 'js';
        }
        let supportedLangExtension = ['c', 'py', 'js']
        const languageObj = {
            'c': c,
            'py': python,
            'js': node,
        }
        let quotedMsg = await message.getQuotedMessage();
        if (quotedMsg.hasMedia && quotedMsg.type === 'document') {
            let get_file_extension = quotedMsg.body.split('.').slice(-1).pop();
            if (supportedLangExtension.includes(get_file_extension)) {
                const fileName = quotedMsg.body;
                const media = await quotedMsg.downloadMedia();
                fs.writeFileSync('./codingfiles/' + fileName, media.data, {
                    encoding: 'base64'
                }, function (err) {
                    //Finished
                });

                let resultPromise = languageObj[get_file_extension].runFile('./codingfiles/' + fileName);
                resultPromise
                    .then(result => {
                        if (result.stderr === '' && result.stdout !== '') {
                            message.reply(`*OUTPUT*\n\n${result.stdout}\n`);
                        } else {
                            let regex = /([\s\S]*)error/gi;
                            let errorToSent = 'error';
                            errorToSent += (result.stderr).replace(regex, '');
                            message.reply(`*OUPUT*\n\n${errorToSent}`);
                            try {
                                fs.unlinkSync('./codingfiles/' + fileName)
                            } catch {

                            }
                        }

                    })
                    .catch(err => {
                        message.reply('Some Error While Running Code\nPlease Check your code or try again');
                        try {
                            fs.unlinkSync('./codingfiles/' + fileName)
                        } catch {

                        }
                    });
            } else {
                message.reply("Not a valid file please check file extension");
            }
        } else if (!quotedMsg.hasMedia) {
            // Run direct code here
            const sourcecode = quotedMsg.body;
            let resultPromise = languageObj[command].runSource(sourcecode);
            resultPromise
                .then(result => {
                    if (result.stderr === '' && result.stdout !== '') {
                        message.reply(`*OUTPUT*\n\n${result.stdout}\n`);
                    } else {
                        let regex = /([\s\S]*)error/gi;
                        let errorToSent = 'error';
                        errorToSent += (result.stderr).replace(regex, '');

                        message.reply(`*OUPUT*\n\n${errorToSent}`);
                    }

                })
                .catch(err => {
                    message.reply('Some Error While Running Code\nPlease Check your code or try again');
                });
        }
    }
}