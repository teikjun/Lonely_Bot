'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class HelpController extends TelegramBaseController {

    startHandler($) {
        let name = $.message.from.firstName;
        $.sendMessage(
            `Hello *${name}*,\nType /help for list of commands`,
            {parse_mode: 'Markdown'}
        );
    }

    helpHandler($) {
        $.sendMessage(
            '*Commands: *\n'
            + 'i.e. /command <input> \n\n'
            + '*checklist cmds:*\n'
            + '/add <item>\n'
            + '/drop <item>\n'
            + '/swap <num1> <num2>\n'
            + '/checklist\n\n'
            + '*Ledger cmds*\n'
            + '/budget\n'
            + '/setbudget <number>\n'
            + '/expenses <number\n'
            + '/pay <number>\n'
            + '/reset\n\n'
            + '*question cmds*\n'
            + '/query <question>',
            {parse_mode: 'Markdown'}
        );
    }

    get routes() {
        return {
            'startCommand': 'startHandler',
            'helpCommand': 'helpHandler'
        }
    }
}

module.exports = HelpController;