'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

const request = require('request');
const f = require('./functions');

const apiurl = 'https://api.wolframalpha.com/v1/result?appid=';
const token = '32RA9W-LQX5H2RJ5P';
const weburl = apiurl + token + '&i=';

class WolframController extends TelegramBaseController {

    queryHandler($) {
        let questionArray = $.message.text.split(' ').slice(1);
        let str = '';
        questionArray = f.filter(x => (x === ''), questionArray);
        for (let i = 0; i < (questionArray.length - 1); i++) {
            str += `${questionArray[i]}+`;
        }
        str += questionArray[questionArray.length - 1];
        request(
            weburl + str,
            (err, res, body) => 
            body.split(' ')[0] === 'Wolfram|Alpha'
                ? $.sendMessage(`I ${body.split(' ').slice(1).join(' ')}`, {parse_mode: 'Markdown'})
                : $.sendMessage(`*Answer:* ${body}`, {parse_mode: 'Markdown'})
        );
    }

    get routes() {
        return {
            'queryCommand': 'queryHandler'
        };
    }
}

module.exports = WolframController;

