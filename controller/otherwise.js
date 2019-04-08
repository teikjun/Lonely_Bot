'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class OtherwiseController extends TelegramBaseController {

    handle($) {
        let name = $.message.from.firstName;
        let text = $.message.text;
        $.sendMessage(
            `Hello *${name}*, I did not understand the text: *${text}*\nPlease type /help for list of commands thank you`,
            {parse_mode: 'Markdown'}
        );
    }
}

module.exports = OtherwiseController;

/*
$ =>
{
    "_api": {
        "_token": "667432780:AAFDnOo9jC2Yz7gmJWhh2g8JPTDvHxx1rGo",
        "_url": "https://api.telegram.org/bot667432780:AAFDnOo9jC2Yz7gmJWhh2g8JPTDvHxx1rGo/",
        "_queue": {
            "_delay": 33.333333333333336,
            "_queue": [],
            "_queueStarted": false
        },
        "_logger": {
            "_logs": ""
        }
    },
    "_update": {
        "update_id": 421687522,
        "message": {
            "message_id": 80,
            "from"
                "id": 586321539,
                "first_name": "Marc",
                "username": "marcfyk"
            },
            "date": 1547449758,
            "chat": {
                "id": 586321539,
                "type": "private",
                "username": "marcfyk",
                "first_name": "Marc"
            },
            "text": "hello;"
        }
    },
    "_extensions": [],
    "_waitingRequests": {},
    "_waitingCallbackQueries": {},
    "_isEditedMessage": false,
    "_message": {
        "message_id": 80,
        "from": {
            "id": 586321539,
            "first_name": "Marc",
            "username": "marcfyk"
        },
        "date": 1547449758,
        "chat": {
            "id": 586321539,
            "type": "private",
            "username": "marcfyk",
            "first_name": "Marc"
        },
        "text": "hello;"
    },
    "_chatId": 586321539,
    "_userId": 586321539,
    "_fromGroupChat": false,
    "_logger": {
        "_logs": ""
    },
    "_sessionStorage": {
        "_storage": {
            "_storage": {
                "_storage": {}
            },
            "_callbacks": {}
        },
        "_cache": {}
    }
}

*/