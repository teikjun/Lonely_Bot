'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

const f = require('./functions');


class CheckListController extends TelegramBaseController {

    addHandler($) {
        let inputArray = $.message.text.split(' ').slice(1);
        inputArray = f.filter(x => x ==='', inputArray);
        if (inputArray.length > 0) {
            let words = inputArray.join(' ');
            $.getUserSession('checklist')
            .then(x => {
                if (!Array.isArray(x)) {
                    $.setUserSession('checklist', [words]);
                } else {
                    $.setUserSession('checklist', x.concat([words]));
                }
            });
            $.sendMessage(
                `Added *${words}* to checklist`,
                {parse_mode: 'Markdown'}
            );
        } else {
            $.sendMessage('Invalid input, try again');
        }
        
    }

    dropHandler($) {
        let inputArray = $.message.text.split(' ').slice(1);
        inputArray = f.filter(x => x === '', inputArray);
        inputArray = f.filter(x => isNaN(parseInt(x) ? x : parseInt(x)), inputArray);
        if (f.check(x => isNaN(x), inputArray) || inputArray.length !== 1) {
            $.sendMessage(
                'Please enter only *one* number\ni.e. /drop <number>',
                {parse_mode: 'Markdown'}
            );
        } else {
            let index = inputArray[0];
            $.getUserSession('checklist')
            .then(x => {
                if (index > x.length || index < 1) {
                    $.sendMessage(
                        `Index *out of range*, please enter a number between 1 and ${x.length}`,
                        {parse_mode: 'Markdown'}
                    );
                } else {
                    x.splice((index - 1), 1);
                    $.setUserSession('checklist', x);
                    $.sendMessage(
                        `removed *index ${index}* from checklist`,
                        {parse_mode: 'Markdown'}
                    );
                }
            });
        }
    }

    swapHandler($) {
        let inputArray = $.message.text.split(' ').slice(1);
        inputArray = f.filter(x => x === '', inputArray);
        inputArray = f.filter(x => isNaN(parseInt(x) ? x : parseInt(x)), inputArray);
        if (f.check(x => isNaN(x), inputArray) && inputArray.length !== 2) {
            $.sendMessage(
                'please enter *two numbers*\ni.e. /swap <num1> <num2>',
                {parse_mode: 'Markdown'}
            );
        } else {
            let index1 = inputArray[0];
            let index2 = inputArray[1];
            $.getUserSession('checklist')
            .then(x => {
                let tmp = x[0];
                x[0] = x[1];
                x[1] = tmp;
                $.setUserSession('checklist', x);
                $.sendMessage(
                    `*swapped* index ${index1} and index ${index2}`,
                    {parse_mode: 'Markdown'}
                );
            });
        }
    }

    checklistHandler($) {
        let display = '*Checklist:*';
        $.getUserSession('checklist')
        .then(x => {
            let list = f.printlist(x, display);
            if (list == display) {
                $.sendMessage(
                    `${display} *empty*`,
                    {parse_mode: 'Markdown'}
                );
            } else {
                $.sendMessage(
                    list,
                    {parse_mode: 'Markdown'}
                );
            }
        })
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'dropCommand': 'dropHandler',
            'swapCommand': 'swapHandler',
            'checklistCommand': 'checklistHandler'
        }
    }
}

module.exports = CheckListController;