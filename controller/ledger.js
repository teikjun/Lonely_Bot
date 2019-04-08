'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

const f = require('./functions');

class LedgerController extends TelegramBaseController {

    setbudgetHandler($) {
        let inputArray = $.message.text.split(' ').slice(1);
        inputArray = f.filter(x => x === '', inputArray);
        inputArray = f.filter(x => isNaN(parseInt(x) ? x : parseInt(x)), inputArray);
        if (f.check(x => isNaN(x), inputArray) || inputArray.length !== 1) {
            $.sendMessage(
                'Please input one number\ni.e. /setbudget <number>',
                {parse_mode: 'Markdown'}
            );
        } else {
            let input = inputArray[0];
            if (f.validateCash(input)) {
                $.setUserSession('budget', input);
                $.sendMessage(
                    `The budget has been set to *$${input}*`,
                    {parse_mode: 'Markdown'}
                );
            } else {
                $.sendMessage(
                    `Your input *${input}* has more than 2 decimal places,\nplease enter a number with at most 2 decimal places`,
                    {parse_mode: 'Markdown'}
                );
            }
        }
    }

    budgetHandler($) {
        $.getUserSession('budget')
        .then(x => {
            if (isNaN(x)) {
                $.setUserSession('budget', 0);  
                $.sendMessage(
                    '*Budget:* $0',
                    {parse_mode: 'Markdown'}
                );   
            } else {
                $.sendMessage(
                    `*Budget:* $${x}`,
                    {parse_mode: 'Markdown'}
                );
            }  
        });
    }

    expensesHandler($) {
        $.getUserSession('expenses')
        .then(x => {
            if (isNaN(x)) {
                $.setUserSession('expenses', 0);
                $.sendMessage(
                    '*Expenses:* $0',
                    {parse_mode: 'Markdown'}
                );
            } else {
                $.sendMessage(
                    `*Expenses:* $${x}`,
                    {parse_mode: 'Markdown'}
                );
            }
        });
    }

    payHandler($) {
        let inputArray = $.message.text.split(' ').slice(1);
        inputArray = f.filter(x => x === '', inputArray);
        inputArray = f.map(x => isNaN(parseInt(x)) ? x : parseInt(x), inputArray);
        if (f.check(x => isNaN(x), inputArray) || inputArray.length !== 1) {
            $.sendMessage(
                `Please enter *one number*\ni.e. /pay <number>`,
                {parse_mode: 'Markdown'}
            );
        } else {
            let newExpense;
            let increment = inputArray[0];
            $.getUserSession('expenses')
            .then(x => {
                if (isNaN(x)) {
                    $.setUserSession('expenses', increment);
                    newExpense = increment;
                    $.sendMessage(
                        `Expenses have *increased* to: $${increment}`,
                        {parse_mode: 'Markdown'}
                    );
                } else {
                    $.setUserSession('expenses', (x + increment));
                    newExpense = x + increment;
                    $.sendMessage(
                        `Expenses have *increased* to: $${x + increment}`,
                        {parse_mode: 'Markdown'}
                    );
                }
            });
            $.getUserSession('budget')
            .then(x => {
                if (x < newExpense) {
                    let diff = newExpense - x;
                    $.sendMessage(
                        `You have *exceeded* your Budget by *$${diff}*!!!`,
                        {parse_mode: 'Markdown'}
                    );
                }
            });
        }
    }

    walletHandler($) {
        let budget;
        let expenses;
        let remaining;
        $.getUserSession('budget')
        .then(x => {
            if (isNaN(x)) {
                $.setUserSession('budget', 0);
                budget = 0;
            } else {
                budget = x;
            }
            $.getUserSession('expenses')
            .then(y => {
                if (isNaN(y)) {
                    $.setUserSession('expenses', 0);
                    expenses = 0;
                } else {
                    expenses = y;
                }
                remaining = budget - expenses;
                $.sendMessage(
                    `*FINANCE REPORT: *\n\n*Budget:* ${budget}\n*Expenses:* ${expenses}\n*Remaining Balance:* ${remaining}`,
                    {parse_mode: 'Markdown'}
                );
            });
        });
    }

    resetHandler($) {
        $.setUserSession('expenses', 0);
        $.sendMessage(
            'Expenses have been *reset* to $0',
            {parse_mode: 'Markdown'}
        );
    }

    get routes() {
        return {
            'setbudgetCommand': 'setbudgetHandler',
            'budgetCommand': 'budgetHandler',
            'expensesCommand': 'expensesHandler',
            'payCommand': 'payHandler',
            'walletCommand': 'walletHandler',
            'resetCommand': 'resetHandler'
        }
    }

}

module.exports = LedgerController;